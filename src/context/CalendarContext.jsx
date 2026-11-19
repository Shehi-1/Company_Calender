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

  // 5-digit PIN for Admin security (Default: 12345, can be changed in Settings)
  const [adminPin, setAdminPin] = useState(() => {
    return localStorage.getItem('occ_admin_pin') || '12345';
  });

  // Current logged in user state (Defaults to Staff so access is free for all staff)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('occ_user');
    return saved
      ? JSON.parse(saved)
      : {
          id: 'user-staff-default',
          name: 'Staff Member',
          email: 'staff@company.ng',
          role: 'staff', // 'admin' | 'staff'
          department: 'General Staff'
        };
  });

  // Global Admin PIN Modal Trigger
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // State with LocalStorage fallback / cache
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('occ_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [staff, setStaff] = useState(() => {
    const saved = localStorage.getItem('occ_staff');
    return saved ? JSON.parse(saved) : INITIAL_STAFF;
  });

  const [holidays, setHolidays] = useState(() => {
    const saved = localStorage.getItem('occ_holidays');
    return saved ? JSON.parse(saved) : DEFAULT_NIGERIAN_HOLIDAYS;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('occ_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [companySettings, setCompanySettings] = useState(() => {
    const saved = localStorage.getItem('occ_settings');
    return saved
      ? JSON.parse(saved)
      : {
          companyName: 'Apex Global Enterprise Nigeria Ltd.',
          workHours: '08:00 AM - 05:00 PM',
          defaultReminderTiming: '24 hours before',
          emailNotifications: true,
          inAppNotifications: true,
          adminEmail: 'calendar-admin@company.ng'
        };
  });

  const [sentEmails, setSentEmails] = useState(() => {
    const saved = localStorage.getItem('occ_sent_emails');
    return saved ? JSON.parse(saved) : [];
  });

  const [isLoadingCloud, setIsLoadingCloud] = useState(false);

  // Sync state changes to LocalStorage
  useEffect(() => {
    localStorage.setItem('occ_admin_pin', adminPin);
  }, [adminPin]);

  useEffect(() => {
    localStorage.setItem('occ_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('occ_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('occ_staff', JSON.stringify(staff));
  }, [staff]);

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

  // Load and seed Supabase data when connected
  useEffect(() => {
    if (!isCloudConnected || !supabase) return;

    let isMounted = true;

    async function syncWithSupabase() {
      setIsLoadingCloud(true);
      try {
        const { data: dbEvents, error: eventsError } = await supabase.from('events').select('*');
        if (!eventsError && dbEvents && dbEvents.length > 0) {
          if (isMounted) setEvents(dbEvents);
        } else if (!eventsError && dbEvents && dbEvents.length === 0) {
          await supabase.from('events').insert(INITIAL_EVENTS);
        }

        const { data: dbStaff, error: staffError } = await supabase.from('staff').select('*');
        if (!staffError && dbStaff && dbStaff.length > 0) {
          if (isMounted) setStaff(dbStaff);
        } else if (!staffError && dbStaff && dbStaff.length === 0) {
          await supabase.from('staff').insert(INITIAL_STAFF);
        }

        const { data: dbHolidays, error: holidaysError } = await supabase.from('holidays').select('*');
        if (!holidaysError && dbHolidays && dbHolidays.length > 0) {
          if (isMounted) setHolidays(dbHolidays);
        } else if (!holidaysError && dbHolidays && dbHolidays.length === 0) {
          await supabase.from('holidays').insert(DEFAULT_NIGERIAN_HOLIDAYS);
        }

        const { data: dbNotifs, error: notifsError } = await supabase.from('notifications').select('*');
        if (!notifsError && dbNotifs && dbNotifs.length > 0) {
          if (isMounted) setNotifications(dbNotifs);
        } else if (!notifsError && dbNotifs && dbNotifs.length === 0) {
          await supabase.from('notifications').insert(INITIAL_NOTIFICATIONS);
        }
      } catch (err) {
        console.warn('Supabase fetch error; working in cached/local mode:', err);
      } finally {
        if (isMounted) setIsLoadingCloud(false);
      }
    }

    syncWithSupabase();

    return () => {
      isMounted = false;
    };
  }, [isCloudConnected]);

  // Verify PIN to become Administrator
  const verifyAndElevateAdmin = (enteredPin) => {
    if (enteredPin === adminPin) {
      setCurrentUser({
        id: 'user-admin-1',
        name: 'Ibrahim Danladi (Admin)',
        email: 'admin.ibrahim@company.ng',
        role: 'admin',
        department: 'Executive Leadership'
      });
      return true;
    }
    return false;
  };

  // Switch back to Staff (Lock admin mode)
  const lockToStaff = () => {
    setCurrentUser({
      id: 'user-staff-default',
      name: 'Staff Member',
      email: 'staff@company.ng',
      role: 'staff',
      department: 'General Staff'
    });
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
      targetEmails = staff.map(s => s.email);
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

  // Staff Handlers
  const addStaff = async (staffData) => {
    const newStaff = {
      ...staffData,
      id: 'staff-' + Date.now(),
      status: staffData.status || 'active'
    };
    setStaff(prev => [...prev, newStaff]);

    if (isCloudConnected && supabase) {
      try {
        await supabase.from('staff').insert([newStaff]);
      } catch (e) {
        console.error('Supabase staff insert:', e);
      }
    }
    return newStaff;
  };

  const updateStaff = async (id, updatedData) => {
    setStaff(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updatedData } : item))
    );

    if (isCloudConnected && supabase) {
      try {
        await supabase.from('staff').update(updatedData).eq('id', id);
      } catch (e) {
        console.error('Supabase staff update:', e);
      }
    }
  };

  const deleteStaff = async (id) => {
    setStaff(prev => prev.filter(item => item.id !== id));

    if (isCloudConnected && supabase) {
      try {
        await supabase.from('staff').delete().eq('id', id);
      } catch (e) {
        console.error('Supabase staff delete:', e);
      }
    }
  };

  // Holidays Handlers
  const addHoliday = async (holidayData) => {
    const newHoliday = {
      ...holidayData,
      id: 'hol-' + Date.now()
    };
    setHolidays(prev => [...prev, newHoliday]);

    if (isCloudConnected && supabase) {
      try {
        await supabase.from('holidays').insert([newHoliday]);
      } catch (e) {
        console.error('Supabase holiday insert:', e);
      }
    }

    addNotification({
      title: `Public Holiday Gazetted: ${newHoliday.name}`,
      message: `Federal Government gazette holiday: ${newHoliday.name} on ${newHoliday.holiday_date}.`,
      type: 'holiday',
      target_role: 'all'
    });
    return newHoliday;
  };

  const updateHoliday = async (id, updatedData) => {
    setHolidays(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updatedData } : item))
    );

    if (isCloudConnected && supabase) {
      try {
        await supabase.from('holidays').update(updatedData).eq('id', id);
      } catch (e) {
        console.error('Supabase holiday update:', e);
      }
    }

    addNotification({
      title: `Public Holiday Updated: ${updatedData.name}`,
      message: `The date for ${updatedData.name} is confirmed for ${updatedData.holiday_date}.`,
      type: 'holiday',
      target_role: 'all'
    });
  };

  const deleteHoliday = async (id) => {
    setHolidays(prev => prev.filter(item => item.id !== id));

    if (isCloudConnected && supabase) {
      try {
        await supabase.from('holidays').delete().eq('id', id);
      } catch (e) {
        console.error('Supabase holiday delete:', e);
      }
    }
  };

  // Notifications Handlers
  const addNotification = async (notif) => {
    const newNotif = {
      ...notif,
      id: 'notif-' + Date.now(),
      is_read: false,
      created_at: new Date().toISOString()
    };
    setNotifications(prev => [newNotif, ...prev]);

    if (isCloudConnected && supabase) {
      try {
        await supabase.from('notifications').insert([newNotif]);
      } catch (e) {
        console.error('Supabase notification insert:', e);
      }
    }
  };

  const markNotificationAsRead = async (id) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, is_read: true } : n))
    );

    if (isCloudConnected && supabase) {
      try {
        await supabase.from('notifications').update({ is_read: true }).eq('id', id);
      } catch (e) {
        console.error('Supabase notification update:', e);
      }
    }
  };

  const markAllNotificationsAsRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));

    if (isCloudConnected && supabase) {
      try {
        await supabase.from('notifications').update({ is_read: true }).neq('id', 'placeholder');
      } catch (e) {
        console.error('Supabase mark all notifications:', e);
      }
    }
  };

  const clearNotification = async (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));

    if (isCloudConnected && supabase) {
      try {
        await supabase.from('notifications').delete().eq('id', id);
      } catch (e) {
        console.error('Supabase notification delete:', e);
      }
    }
  };

  // Derived Staff Birthdays
  const getStaffBirthdayEvents = (year = 2026) => {
    return staff.map(member => {
      const parts = member.birthday.split('-');
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
        lockToStaff,
        changeAdminPin,
        isAdminModalOpen,
        setIsAdminModalOpen,
        isCloudConnected,
        isLoadingCloud,
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        staff,
        addStaff,
        updateStaff,
        deleteStaff,
        holidays,
        addHoliday,
        updateHoliday,
        deleteHoliday,
        notifications,
        addNotification,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        clearNotification,
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
