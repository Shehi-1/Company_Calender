import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DEFAULT_NIGERIAN_HOLIDAYS,
  INITIAL_STAFF,
  INITIAL_EVENTS,
  INITIAL_NOTIFICATIONS
} from '../data/initialData';

const CalendarContext = createContext(null);

export const CalendarProvider = ({ children }) => {
  // Current logged in user state (Toggleable between Admin and Staff for testing)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('occ_user');
    return saved
      ? JSON.parse(saved)
      : {
          id: 'user-admin-1',
          name: 'Ibrahim Danladi',
          email: 'admin.ibrahim@company.ng',
          role: 'admin', // 'admin' | 'staff'
          department: 'Executive Leadership'
        };
  });

  // Data Collections with LocalStorage persistence & Supabase bridge capability
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

  // Outgoing email audit log simulation
  const [sentEmails, setSentEmails] = useState(() => {
    const saved = localStorage.getItem('occ_sent_emails');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync to LocalStorage
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

    // Add In-App notification as well if enabled
    if (companySettings.inAppNotifications) {
      addNotification({
        title: subject,
        message: body,
        type: 'event',
        target_role: 'all'
      });
    }
  };

  // Switch role between Admin and Staff easily
  const switchRole = (role) => {
    if (role === 'admin') {
      setCurrentUser({
        id: 'user-admin-1',
        name: 'Ibrahim Danladi',
        email: 'admin.ibrahim@company.ng',
        role: 'admin',
        department: 'Executive Leadership'
      });
    } else {
      setCurrentUser({
        id: 'user-staff-2',
        name: 'Amina Bello',
        email: 'amina.bello@company.ng',
        role: 'staff',
        department: 'Human Resources'
      });
    }
  };

  // Event Handlers
  const addEvent = (eventData) => {
    const newEvent = {
      ...eventData,
      id: 'evt-' + Date.now()
    };
    setEvents(prev => [newEvent, ...prev]);

    sendEmailNotification(
      `New Event Created: ${newEvent.title}`,
      `A new company event '${newEvent.title}' has been scheduled for ${newEvent.event_date} at ${newEvent.start_time || 'All Day'}. Venue: ${newEvent.venue || 'TBD'}.`
    );
    return newEvent;
  };

  const updateEvent = (id, updatedData) => {
    setEvents(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updatedData } : item))
    );
    sendEmailNotification(
      `Event Updated: ${updatedData.title}`,
      `The event '${updatedData.title}' scheduled for ${updatedData.event_date} has been updated with new schedule or venue details.`
    );
  };

  const deleteEvent = (id) => {
    const eventToDelete = events.find(e => e.id === id);
    setEvents(prev => prev.filter(item => item.id !== id));
    if (eventToDelete) {
      sendEmailNotification(
        `Event Cancelled: ${eventToDelete.title}`,
        `Notice: The scheduled event '${eventToDelete.title}' on ${eventToDelete.event_date} has been cancelled.`
      );
    }
  };

  // Staff Handlers
  const addStaff = (staffData) => {
    const newStaff = {
      ...staffData,
      id: 'staff-' + Date.now(),
      status: staffData.status || 'active'
    };
    setStaff(prev => [...prev, newStaff]);
    return newStaff;
  };

  const updateStaff = (id, updatedData) => {
    setStaff(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updatedData } : item))
    );
  };

  const deleteStaff = (id) => {
    setStaff(prev => prev.filter(item => item.id !== id));
  };

  // Holidays Handlers
  const addHoliday = (holidayData) => {
    const newHoliday = {
      ...holidayData,
      id: 'hol-' + Date.now()
    };
    setHolidays(prev => [...prev, newHoliday]);

    addNotification({
      title: `Public Holiday Gazetted: ${newHoliday.name}`,
      message: `Federal Government gazette holiday: ${newHoliday.name} on ${newHoliday.holiday_date}.`,
      type: 'holiday',
      target_role: 'all'
    });
    return newHoliday;
  };

  const updateHoliday = (id, updatedData) => {
    setHolidays(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updatedData } : item))
    );
    addNotification({
      title: `Public Holiday Updated: ${updatedData.name}`,
      message: `The date for ${updatedData.name} is confirmed for ${updatedData.holiday_date}.`,
      type: 'holiday',
      target_role: 'all'
    });
  };

  const deleteHoliday = (id) => {
    setHolidays(prev => prev.filter(item => item.id !== id));
  };

  // Notifications Handlers
  const addNotification = (notif) => {
    const newNotif = {
      ...notif,
      id: 'notif-' + Date.now(),
      is_read: false,
      created_at: new Date().toISOString()
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, is_read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
  };

  const clearNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Convert Staff Birthdays into dynamic calendar items for any given year
  const getStaffBirthdayEvents = (year = 2026) => {
    return staff.map(member => {
      // member.birthday is YYYY-MM-DD
      const parts = member.birthday.split('-');
      const monthDay = parts.length === 3 ? `${parts[1]}-${parts[2]}` : '01-01';
      const eventDate = `${year}-${monthDay}`;

      return {
        id: `bday-${member.id}-${year}`,
        title: `${member.full_name}'s Birthday 🎂`,
        category: 'birthday',
        description: `Celebrate with ${member.full_name} (${member.department}). Reach out at ${member.email}`,
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

  // Convert Public Holidays into calendar items
  const getPublicHolidayEvents = () => {
    return holidays.map(h => ({
      id: `hol-evt-${h.id}`,
      title: `${h.name} (Public Holiday 🇳🇬)`,
      category: 'holiday',
      description: h.description + (h.is_lunar_estimated ? ' (Subject to lunar confirmation by NSCIA / FG)' : ''),
      event_date: h.holiday_date,
      start_time: 'All Day',
      end_time: 'All Day',
      venue: 'Federal Republic of Nigeria (Nationwide)',
      participants: 'All Employees (Statutory Observance)',
      holidayId: h.id,
      isHolidayDerived: true
    }));
  };

  // Combined Master Calendar Items
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
        switchRole,
        isAdmin: currentUser?.role === 'admin',
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
