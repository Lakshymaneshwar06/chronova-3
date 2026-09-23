import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Bookmark,
  Bell,
  Search,
  CheckCircle2,
  Calendar,
  FileText,
  X,
  User,
  Shield,
  GraduationCap,
  QrCode,
  MessageSquare,
  ChevronDown,
  Sun,
  Moon,
  Globe,
  Users,
  LogIn,
  LogOut,
  Menu,
  Compass
} from 'lucide-react';
import { AppMode, AppRole, StudentTab, UserProfile, ThemeMode, IndianLanguage } from '../types';
import { INDIAN_LANGUAGES } from '../utils/languages';
import { ChronovaLogo } from './common/ChronovaLogo';

interface CleanHeaderProps {
  currentRole: AppRole;
  currentMode: AppMode;
  onModeChange: (mode: AppMode) => void;
  studentTab: StudentTab;
  onStudentTabChange: (tab: StudentTab) => void;
  user: UserProfile | null;
  onOpenAuthModal: (preferredRole?: AppRole) => void;
  onLogout: () => void;
  onOpenUpload: () => void;
  onOpenSavedVault: () => void;
  savedCount: number;
  registeredCount: number;
  unreadNotificationsCount?: number;
  onOpenNotifications?: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  eventCount: number;
  studyCount: number;
  clubCount: number;
  theme: ThemeMode;
  onToggleTheme: () => void;
  language: IndianLanguage;
  onLanguageChange: (lang: IndianLanguage) => void;
  t: (key: string) => string;
}

export const Header: React.FC<CleanHeaderProps> = ({
  currentRole,
  currentMode,
  onModeChange,
  studentTab,
  onStudentTabChange,
  user,
  onOpenAuthModal,
  onLogout,
  onOpenUpload,
  onOpenSavedVault,
  savedCount,
  registeredCount,
  unreadNotificationsCount = 0,
  onOpenNotifications,
  searchQuery,
  onSearchChange,
  eventCount,
  studyCount,
  clubCount,
  theme,
  onToggleTheme,
  language,
  onLanguageChange,
  t
}) => {
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setShowLanguageMenu(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLangObj = INDIAN_LANGUAGES.find((l) => l.code === language) || INDIAN_LANGUAGES[0];

  return (
    <header
      id="main-header"
      className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/85 border-b border-pastel-lavender/60 transition-colors shadow-xs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* 1. Left: Brand Logo & Title */}
          <div className="flex items-center gap-6 shrink-0">
            <ChronovaLogo
              size="md"
              variant="full"
              onClick={() => {
                onStudentTabChange('catalog');
                onModeChange('events');
              }}
            />

            {/* Main Navigation Links (Clean, minimal top-nav like modern portfolios/clean sites) */}
            <nav className="hidden md:flex items-center gap-1">
              <button
                id="nav-events-btn"
                onClick={() => {
                  onStudentTabChange('catalog');
                  onModeChange('events');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  studentTab === 'catalog' && currentMode === 'events'
                    ? 'bg-pastel-lavender text-indigo-900 font-bold border border-pastel-lavender shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-pastel-lavender/40'
                }`}
              >
                <span>{t('events')}</span>
                <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded-full bg-white/80 text-slate-700">
                  {eventCount}
                </span>
              </button>

              <button
                id="nav-study-btn"
                onClick={() => {
                  onStudentTabChange('catalog');
                  onModeChange('study');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  studentTab === 'catalog' && currentMode === 'study'
                    ? 'bg-pastel-sky text-sky-900 font-bold border border-pastel-sky shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-pastel-sky/40'
                }`}
              >
                <span>{t('studyHub')}</span>
                <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded-full bg-white/80 text-slate-700">
                  {studyCount}
                </span>
              </button>

              {/* Club Directory instead of Dual Mode */}
              <button
                id="nav-clubs-btn"
                onClick={() => {
                  onStudentTabChange('catalog');
                  onModeChange('clubs');
                }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  studentTab === 'catalog' && currentMode === 'clubs'
                    ? 'bg-pastel-peach text-amber-900 font-bold border border-pastel-peach shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-pastel-peach/40'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>{t('clubs')}</span>
                <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded-full bg-white/80 text-slate-700">
                  {clubCount}
                </span>
              </button>

              {/* QR Hub shortcut */}
              <button
                id="nav-qr-btn"
                onClick={() => onStudentTabChange('qr-hub')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  studentTab === 'qr-hub'
                    ? 'bg-pastel-mint text-emerald-800 font-bold border border-pastel-mint shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-pastel-mint/40'
                }`}
              >
                {t('qrHub')}
              </button>

              {/* Feedback */}
              <button
                id="nav-feedback-btn"
                onClick={() => onStudentTabChange('feedback')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  studentTab === 'feedback'
                    ? 'bg-pastel-rose text-rose-800 font-bold border border-pastel-rose shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-pastel-rose/40'
                }`}
              >
                {t('feedback')}
              </button>

              {/* Dedicated Login Page Tab */}
              <button
                id="nav-login-tab-btn"
                onClick={() => onStudentTabChange('login')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  studentTab === 'login'
                    ? 'bg-pastel-lavender text-indigo-900 font-bold border border-pastel-lavender shadow-xs'
                    : 'text-slate-600 hover:text-indigo-800 hover:bg-pastel-lavender/40'
                }`}
              >
                <LogIn className="w-3.5 h-3.5 text-indigo-500" />
                <span>Portal Login</span>
              </button>
            </nav>
          </div>

          {/* 2. Middle Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-xs mx-4">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-8 pr-7 py-1.5 text-xs rounded-xl bg-pastel-lavender/30 border border-pastel-lavender/70 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-400 font-medium transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2 top-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* 3. Right: Utility Controls (Theme Toggle, Indian Languages, Vault, Login / User Profile) */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Mobile Search button */}
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Indian Languages Selector */}
            <div className="relative" ref={langRef}>
              <button
                id="language-selector-btn"
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center gap-1.5 py-1.5 px-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
                title="Change Language (Indian Regional Languages)"
              >
                <Globe className="w-3.5 h-3.5 text-indigo-500" />
                <span className="font-medium">{currentLangObj.nativeName}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showLanguageMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white border border-slate-200 shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Indian Languages
                  </div>
                  <div className="max-h-60 overflow-y-auto space-y-0.5">
                    {INDIAN_LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          onLanguageChange(lang.code as IndianLanguage);
                          setShowLanguageMenu(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                          language === lang.code
                            ? 'bg-indigo-50 text-indigo-700 font-bold'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span>{lang.name}</span>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {lang.nativeName}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Light Theme Active Indicator */}
            <div
              id="theme-indicator"
              className="p-2 rounded-xl text-amber-500 bg-amber-50 border border-amber-200 transition-colors"
              title="Light theme active"
            >
              <Sun className="w-4 h-4 text-amber-500" />
            </div>

            {/* Bookmarks / Vault */}
            <button
              id="header-vault-btn"
              onClick={onOpenSavedVault}
              className="relative p-2 rounded-xl text-slate-600 hover:text-indigo-600 bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
              title={t('myVault')}
            >
              <Bookmark className="w-4 h-4 text-indigo-600" />
              {(savedCount > 0 || registeredCount > 0) && (
                 <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[9px] font-bold text-white font-mono shadow-xs">
                   {savedCount + registeredCount}
                 </span>
              )}
            </button>

            {/* Live Campus Notifications Bell */}
            <button
              id="header-notifications-btn"
              onClick={onOpenNotifications}
              className="relative p-2 rounded-xl text-slate-600 hover:text-indigo-600 bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
              title="Campus Live Updates"
            >
              <Bell className="w-4 h-4 text-slate-700" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[9px] font-bold text-white font-mono animate-pulse shadow-xs">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Authentication Button OR User Profile Menu */}
            {!user ? (
              <button
                id="header-login-btn"
                onClick={() => onOpenAuthModal()}
                className="flex items-center gap-1.5 py-1.5 px-3.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{t('login')}</span>
              </button>
            ) : (
              <div className="relative" ref={userRef}>
                <button
                  id="user-profile-menu-btn"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-1 pl-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all cursor-pointer"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="hidden sm:inline text-xs font-bold text-slate-800 pr-1">
                    {user.name.split(' ')[0]}
                  </span>
                  <span className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded-full ${
                    user.role === 'admin' 
                      ? 'bg-amber-100 text-amber-800' 
                      : 'bg-indigo-100 text-indigo-800'
                  }`}>
                    {user.role}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400 mr-1" />
                </button>

                {showUserMenu && (
                  <div
                    id="user-dropdown-menu"
                    className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-200 shadow-xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150 text-xs"
                  >
                    <div className="pb-2 mb-2 border-b border-slate-100">
                      <p className="font-bold text-slate-900">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-indigo-600 font-bold">
                        {user.role === 'admin' ? 'Faculty Admin' : `ID: ${user.rollNumber || 'CH-2026'}`}
                      </span>
                    </div>

                    <div className="space-y-1">
                      {user.role === 'admin' ? (
                        <div className="p-2 rounded-xl bg-amber-50 text-amber-800 text-[11px] font-medium mb-1">
                          ✓ Admin Access Granted
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            onOpenAuthModal('admin');
                            setShowUserMenu(false);
                          }}
                          className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-slate-100 text-slate-700 font-medium flex items-center justify-between"
                        >
                          <span>Switch to Admin Panel</span>
                          <Shield className="w-3.5 h-3.5 text-indigo-600" />
                        </button>
                      )}

                      <button
                        onClick={() => {
                          onOpenSavedVault();
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-slate-100 text-slate-700 font-medium"
                      >
                        {t('myVault')}
                      </button>

                      <button
                        onClick={() => {
                          onOpenUpload();
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-slate-100 text-indigo-600 font-bold"
                      >
                        + Contribute Material
                      </button>

                      <div className="pt-2 border-t border-slate-100">
                        <button
                          onClick={() => {
                            onLogout();
                            setShowUserMenu(false);
                          }}
                          className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-rose-50 text-rose-600 font-semibold flex items-center gap-1.5 cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>{t('logout')}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search Bar Expansion */}
        {showMobileSearch && (
          <div className="lg:hidden pb-3 pt-1 border-t border-slate-100">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-slate-100 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-2.5 text-slate-400"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-100 text-xs">
          <button
            onClick={() => {
              onStudentTabChange('catalog');
              onModeChange('events');
            }}
            className={`px-2 py-1 rounded-lg font-semibold transition-colors ${
              studentTab === 'catalog' && currentMode === 'events'
                ? 'text-indigo-600 font-bold bg-indigo-50'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('events')}
          </button>
          <button
            onClick={() => {
              onStudentTabChange('catalog');
              onModeChange('study');
            }}
            className={`px-2 py-1 rounded-lg font-semibold transition-colors ${
              studentTab === 'catalog' && currentMode === 'study'
                ? 'text-indigo-600 font-bold bg-indigo-50'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('studyHub')}
          </button>
          <button
            onClick={() => {
              onStudentTabChange('catalog');
              onModeChange('clubs');
            }}
            className={`px-2 py-1 rounded-lg font-semibold transition-colors ${
              studentTab === 'catalog' && currentMode === 'clubs'
                ? 'text-indigo-600 font-bold bg-indigo-50'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('clubs')}
          </button>
          <button
            onClick={() => onStudentTabChange('qr-hub')}
            className={`px-2 py-1 rounded-lg font-semibold transition-colors ${
              studentTab === 'qr-hub'
                ? 'text-emerald-700 font-bold bg-emerald-50'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('qrHub')}
          </button>
          <button
            onClick={() => onStudentTabChange('feedback')}
            className={`px-2 py-1 rounded-lg font-semibold transition-colors ${
              studentTab === 'feedback'
                ? 'text-rose-700 font-bold bg-pastel-rose'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('feedback')}
          </button>
          <button
            onClick={() => onStudentTabChange('login')}
            className={`px-2 py-1 rounded-lg font-semibold transition-colors flex items-center gap-1 ${
              studentTab === 'login'
                ? 'text-indigo-800 font-bold bg-pastel-lavender'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LogIn className="w-3 h-3 text-indigo-500" />
            <span>Login</span>
          </button>
        </div>
      </div>
    </header>
  );
};
