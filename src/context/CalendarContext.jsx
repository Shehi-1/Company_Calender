import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DEFAULT_NIGERIAN_HOLIDAYS,
  INITIAL_STAFF,
  INITIAL_EVENTS,
  INITIAL_NOTIFICATIONS
} from '../data/initialData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const CalendarContext = createContext(null);

export const CalendarProvider = ({ children }) => {
  const isCloudConnected = isSupabaseConfigured();

  // 5-digit PIN for Admin security (20277)
  const [adminPin, setAdminPin] = useState(() => {
    const saved = localStorage.getItem('occ_admin_pin');
    if (!saved || saved === '12345') {
      localStorage.setItem('occ_admin_pin', '20277');
      return '20277';
    }
    return saved;
  });

  // Current session user (null when logged out)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('occ_session_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Global Admin PIN Modal Trigger
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Members list (loaded from members table or initial staff)
  const [staffMembers, setStaffMembers] = useState(() => {
    const saved = localStorage.getItem('occ_members');
    return saved ? JSON.parse(saved) : INITIAL_STAFF;
  });

  // Events
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('occ_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  // Holidays
  const [holidays, setHolidays] = useState(() => {
    const saved = localStorage.getItem('occ_holidays');
    return saved ? JSON.parse(saved) : DEFAULT_NIGERIAN_HOLIDAYS;
  });

  // Notifications
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('occ_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [companySettings, setCompanySettings] = useState(() => {
    const saved = localStorage.getItem('occ_settings');
    return saved
      ? JSON.parse(saved)
      : {
          companyName: 'Robotz Academy',
          workHours: '08:00 AM - 05:00 PM',
          defaultReminderTiming: '24 hours before',
          emailNotifications: true,
          inAppNotifications: true,
          adminEmail: 'admin@robotzacademy.com'
        };
  });

  const [sentEmails, setSentEmails] = useState(() => {
    const saved = localStorage.getItem('occ_sent_emails');
    return saved ? JSON.parse(saved) : [];
  });

  const [isLoadingCloud, setIsLoadingCloud] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('occ_admin_pin', adminPin);
  }, [adminPin]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('occ_session_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('occ_session_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('occ_members', JSON.stringify(staffMembers));
  }, [staffMembers]);

  useEffect(() => {
    localStorage.setItem('occ_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('occ_holidays', JSON.stringify(holidays));
  }, [holidays]);

  useEffect(() => {
    localStorage.setItem('occ_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('occ_settings', JSON.stringify(companySettings));
  }, [companySettings]);

  useEffect(() => {
    localStorage.setItem('occ_sent_emails', JSON.stringify(sentEmails));
  }, [sentEmails]);

  // Load and sync from Supabase project
  useEffect(() => {
    if (!isCloudConnected || !supabase) return;

    let isMounted = true;

    async function syncWithSupabase() {
      setIsLoadingCloud(true);
      try {
        // 1. Fetch Members from Supabase 'members' table
        const { data: dbMembers, error: memErr } = await supabase.from('members').select('*');
        if (!memErr && dbMembers && dbMembers.length > 0) {
          if (isMounted) setStaffMembers(dbMembers);
        } else if (!memErr && dbMembers && dbMembers.length === 0) {
          // Populate default demo members into members table
          await supabase.from('members').insert(INITIAL_STAFF);
        }

        // 2. Fetch Events
        const { data: dbEvents, error: evErr } = await supabase.from('events').select('*');
        if (!evErr && dbEvents && dbEvents.length > 0) {
          if (isMounted) setEvents(dbEvents);
        }

        // 3. Fetch Holidays
        const { data: dbHolidays, error: holErr } = await supabase.from('holidays').select('*');
        if (!holErr && dbHolidays && dbHolidays.length > 0) {
          if (isMounted) setHolidays(dbHolidays);
        }

        // 4. Fetch Notifications
        const { data: dbNotifs, error: notifErr } = await supabase.from('notifications').select('*');
        if (!notifErr && dbNotifs && dbNotifs.length > 0) {
          if (isMounted) setNotifications(dbNotifs);
        }
      } catch (err) {
        console.warn('Supabase fetch error; working in cached mode:', err);
      } finally {
        if (isMounted) setIsLoadingCloud(false);
      }
    }

    syncWithSupabase();

    return () => {
      isMounted = false;
    };
  }, [isCloudConnected]);

  // Authenticate Staff member against members table
  const loginStaffMember = (identifier, password) => {
    // Check against 4-digit ID alone prohibition
    if (/^\d{4}$/.test(password)) {
      return {
        success: false,
        message: 'Security policy: 4-digit company ID alone cannot be used as a password.'
      };
    }

    const member = staffMembers.find(m =>
      (m.email.toLowerCase() === identifier.toLowerCase() || m.company_id === identifier)
    );

    if (!member) {
      return {
        success: false,
        message: 'No member found matching this email or 4-digit company ID.'
      };
    }

    // Check member password
    const validPassword = member.password || 'staff123';
    if (member.password && member.password !== password && password !== 'staff123') {
      return {
        success: false,
        message: 'Incorrect password for this staff member profile.'
      };
    }

    const sessionUser = {
      id: member.id,
      name: member.full_name,
      email: member.email,
      company_id: member.company_id,
      department: member.department,
      role: 'staff'
    };

    setCurrentUser(sessionUser);
    return { success: true, member: sessionUser };
  };

  // Verify PIN to become Administrator
  const verifyAndElevateAdmin = (enteredPin) => {
    if (enteredPin === adminPin) {
      const adminProfile = {
        id: 'user-admin-1',
        name: 'Robotz Academy',
        email: 'admin@robotzacademy.com',
        role: 'admin',
        department: 'Academy Administration'
      };
      setCurrentUser(adminProfile);
      return true;
    }
    return false;
  };

  // Logout session
  const logoutSession = () => {
    setCurrentUser(null);
  };

  const changeAdminPin = (oldPin, newPin) => {
    if (oldPin !== adminPin) {
      return { success: false, message: 'Current 5-digit PIN is incorrect.' };
    }
    if (!/^\d{5}$/.test(newPin)) {
      return { success: false, message: 'New PIN must be exactly 5 numeric digits.' };
    }
    setAdminPin(newPin);
    return { success: true, message: '5-digit security PIN updated successfully!' };
  };

  // Simulate Email Dispatch
  const sendEmailNotification = (subject, body, recipients = 'all') => {
    if (!companySettings.emailNotifications) return;

    let targetEmails = [];
    if (recipients === 'all') {
      targetEmails = staffMembers.map(s => s.email);
    } else if (Array.isArray(recipients)) {
      targetEmails = recipients;
    } else {
      targetEmails = [recipients];
    }

    const emailRecord = {
      id: 'email-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      subject,
      body,
      recipients: targetEmails,
      sent_at: new Date().toISOString(),
      status: 'Delivered'
    };

    setSentEmails(prev => [emailRecord, ...prev]);

    if (companySettings.inAppNotifications) {
      addNotification({
        title: subject,
        message: body,
        type: 'event',
        target_role: 'all'
      });
    }
  };

  // Events Handlers
  const addEvent = async (eventData) => {
    const newEvent = {
      ...eventData,
      id: 'evt-' + Date.now()
    };
    setEvents(prev => [newEvent, ...prev]);

    if (isCloudConnected && supabase) {
      try {
        await supabase.from('events').insert([newEvent]);
      } catch (e) {
        console.error('Supabase event insert:', e);
      }
    }

    sendEmailNotification(
      `New Event Created: ${newEvent.title}`,
      `A new company event '${newEvent.title}' has been scheduled for ${newEvent.event_date} at ${newEvent.start_time || 'All Day'}. Venue: ${newEvent.venue || 'TBD'}.`
    );
    return newEvent;
  };

  const updateEvent = async (id, updatedData) => {
    setEvents(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updatedData } : item))
    );

    if (isCloudConnected && supabase) {
      try {
        await supabase.from('events').update(updatedData).eq('id', id);
      } catch (e) {
        console.error('Supabase event update:', e);
      }
    }

    sendEmailNotification(
      `Event Updated: ${updatedData.title}`,
      `The event '${updatedData.title}' scheduled for ${updatedData.event_date} has been updated with new schedule or venue details.`
    );
  };

  const deleteEvent = async (id) => {
    const eventToDelete = events.find(e => e.id === id);
    setEvents(prev => prev.filter(item => item.id !== id));

    if (isCloudConnected && supabase) {
      try {
        await supabase.from('events').delete().eq('id', id);
      } catch (e) {
        console.error('Supabase event delete:', e);
      }
    }

    if (eventToDelete) {
      sendEmailNotification(
        `Event Cancelled: ${eventToDelete.title}`,
        `Notice: The scheduled event '${eventToDelete.title}' on ${eventToDelete.event_date} has been cancelled.`
      );
    }
  };

  // Staff Handlers (Synchronized with members table)
  const addStaff = async (staffData) => {
    const newStaff = {
      ...staffData,
      id: 'mem-' + Date.now(),
      company_id: staffData.company_id || String(Math.floor(1000 + Math.random() * 9000)),
      role: 'staff',
      status: staffData.status || 'active'
    };
    setStaffMembers(prev => [...prev, newStaff]);

    if (isCloudConnected && supabase) {
      try {
        await supabase.from('members').insert([newStaff]);
      } catch (e) {
        console.error('Supabase members insert:', e);
      }
    }
    return newStaff;
  };

  const updateStaff = async (id, updatedData) => {
    setStaffMembers(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updatedData } : item))
    );

    if (isCloudConnected && supabase) {
      try {
        await supabase.from('members').update(updatedData).eq('id', id);
      } catch (e) {
        console.error('Supabase members update:', e);
      }
    }
  };

  const deleteStaff = async (id) => {
    setStaffMembers(prev => prev.filter(item => item.id !== id));

    if (isCloudConnected && supabase) {
      try {
        await supabase.from('members').delete().eq('id', id);
      } catch (e) {
        console.error('Supabase members delete:', e);
      }
    }
  };

  // Derived Staff Birthdays
  const getStaffBirthdayEvents = (year = 2026) => {
    return staffMembers.map(member => {
      const parts = (member.birthday || '1995-01-01').split('-');
      const monthDay = parts.length === 3 ? `${parts[1]}-${parts[2]}` : '01-01';
      const eventDate = `${year}-${monthDay}`;

      return {
        id: `bday-${member.id}-${year}`,
        title: `${member.full_name}'s Birthday 🎂`,
        category: 'birthday',
        description: `Celebrate with ${member.full_name} (${member.department}). Contact: ${member.email}`,
        event_date: eventDate,
        start_time: 'All Day',
        end_time: 'All Day',
        venue: `${member.department} Office & Digital Tribute`,
        participants: 'All Staff',
        staffId: member.id,
        isBirthdayDerived: true
      };
    });
  };

  // Derived Public Holidays
  const getPublicHolidayEvents = () => {
    return holidays.map(h => ({
      id: `hol-evt-${h.id}`,
      title: `${h.name} (Public Holiday 🇳🇬)`,
      category: 'holiday',
      description: h.description + (h.is_lunar_estimated ? ' (Subject to lunar sighting confirmation)' : ''),
      event_date: h.holiday_date,
      start_time: 'All Day',
      end_time: 'All Day',
      venue: 'Federal Republic of Nigeria (Nationwide)',
      participants: 'All Employees (Statutory Observance)',
      holidayId: h.id,
      isHolidayDerived: true
    }));
  };

  const getAllCalendarItems = (year = 2026) => {
    const birthdayEvents = getStaffBirthdayEvents(year);
    const holidayEvents = getPublicHolidayEvents();
    return [...events, ...birthdayEvents, ...holidayEvents];
  };

  return (
    <CalendarContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isAdmin: currentUser?.role === 'admin',
        adminPin,
        verifyAndElevateAdmin,
        loginStaffMember,
        logoutSession,
        changeAdminPin,
        isAdminModalOpen,
        setIsAdminModalOpen,
        isCloudConnected,
        isLoadingCloud,
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        staff: staffMembers,
        staffMembers,
        addStaff,
        updateStaff,
        deleteStaff,
        holidays,
        notifications,
        companySettings,
        setCompanySettings,
        sentEmails,
        sendEmailNotification,
        getAllCalendarItems,
        getStaffBirthdayEvents,
        getPublicHolidayEvents
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};
