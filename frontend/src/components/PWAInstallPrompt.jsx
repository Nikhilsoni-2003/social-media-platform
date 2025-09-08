import React, { useState, useEffect } from 'react';
import { IoClose, IoDownload } from 'react-icons/io5';

function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show the install prompt after a delay
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    const handleAppInstalled = () => {
      console.log('PWA was installed');
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Don't show again for this session
    sessionStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  // Don't show if already dismissed in this session
  if (sessionStorage.getItem('pwa-prompt-dismissed') === 'true') {
    return null;
  }

  if (!showPrompt || !deferredPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-80">
      <div className="glass rounded-2xl container-padding shadow-2xl fade-in-up">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center element-gap">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <IoDownload className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-primary text-sm">Install Vybe</h3>
              <p className="text-xs text-secondary">Get the full app experience</p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-secondary hover:text-primary transition-colors duration-200 hover-bg rounded-lg p-1"
          >
            <IoClose className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-xs text-secondary mb-4 leading-relaxed">
          Install Vybe for faster access, offline support, and native app experience.
        </p>
        
        <div className="flex element-gap">
          <button
            onClick={handleInstallClick}
            className="flex-1 gradient-primary text-white py-2 px-4 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300"
          >
            Install
          </button>
          <button
            onClick={handleDismiss}
            className="px-4 py-2 text-secondary text-sm font-medium hover:text-primary transition-colors duration-200 hover-bg rounded-lg"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
}

export default PWAInstallPrompt;
