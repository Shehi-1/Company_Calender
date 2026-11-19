import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import CalendarView from './components/CalendarView';
import EventsManagement from './components/EventsManagement';
import BirthdaysManagement from './components/BirthdaysManagement';
import HolidaysManagement from './components/HolidaysManagement';
import MeetingsView from './components/MeetingsView';
import NotificationsCenter from './components/NotificationsCenter';
import StaffManagement from './components/StaffManagement';
import SettingsView from './components/SettingsView';
import EventDetailModal from './components/EventDetailModal';
import EventFormModal from './components/EventFormModal';
import AdminPinModal from './components/AdminPinModal';
import LoginPage from './components/LoginPage';
import { useCalendar } from './context/CalendarContext';

export default function App() {
  const { currentUser, isAdminModalOpen, setIsAdminModalOpen } = useCalendar();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Modals state
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);

  // If no user is logged in, show the brand new Separate Login Page
  if (!currentUser) {
    return <LoginPage onLoginSuccess={() => setActiveTab('dashboard')} />;
  }

  const handleOpenNewEvent = () => {
    setEventToEdit(null);
    setIsEventFormOpen(true);
  };

  const handleEditEvent = (evt) => {
    setEventToEdit(evt);
    setIsEventFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen">
        <Header
          setMobileOpen={setMobileOpen}
          onOpenNewEvent={handleOpenNewEvent}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {activeTab === 'dashboard' && (
            <Dashboard
              setActiveTab={setActiveTab}
              onOpenNewEvent={handleOpenNewEvent}
              onSelectEvent={setSelectedEvent}
            />
          )}

          {activeTab === 'calendar' && (
            <CalendarView
              onSelectEvent={setSelectedEvent}
              onOpenNewEvent={handleOpenNewEvent}
            />
          )}

          {activeTab === 'events' && (
            <EventsManagement
              onOpenNewEvent={handleOpenNewEvent}
              onSelectEvent={setSelectedEvent}
              onEditEvent={handleEditEvent}
            />
          )}

          {activeTab === 'birthdays' && (
            <BirthdaysManagement />
          )}

          {activeTab === 'holidays' && (
            <HolidaysManagement />
          )}

          {activeTab === 'meetings' && (
            <MeetingsView
              onOpenNewEvent={handleOpenNewEvent}
              onSelectEvent={setSelectedEvent}
            />
          )}

          {activeTab === 'notifications' && (
            <NotificationsCenter />
          )}

          {activeTab === 'staff' && (
            <StaffManagement />
          )}

          {activeTab === 'settings' && (
            <SettingsView />
          )}
        </main>
      </div>

      {/* 5-Digit PIN Modal for Admin Access */}
      <AdminPinModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />

      {/* Global Event Detail View Modal */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onEdit={(evt) => {
            setSelectedEvent(null);
            handleEditEvent(evt);
          }}
        />
      )}

      {/* Global Event Create / Edit Modal */}
      {isEventFormOpen && (
        <EventFormModal
          isOpen={isEventFormOpen}
          onClose={() => setIsEventFormOpen(false)}
          initialData={eventToEdit}
        />
      )}
    </div>
  );
}
