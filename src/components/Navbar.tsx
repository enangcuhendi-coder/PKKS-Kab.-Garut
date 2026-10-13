import React from 'react';
import { Role } from '../types/pkks';
import { 
  School, 
  UserCheck, 
  ShieldCheck, 
  BookOpen, 
  FileText, 
  RotateCcw,
  CheckCircle2,
  ChevronDown,
  Trash2
} from 'lucide-react';
import { LogoGarut } from './LogoGarut';

interface NavbarProps {
  currentRole: Role;
  onSelectRole: (role: Role) => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenPanduan: () => void;
  onOpenBersihkanData: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onSelectRole,
  activeTab,
  onSelectTab,
  onOpenPanduan,
  onOpenBersihkanData,
}) => {
  const [roleDropdownOpen, setRoleDropdownOpen] = React.useState(false);

  const getRoleLabel = (role: Role) => {
    switch (role) {
      case 'pengawas':
        return { label: 'Pengawas Pembina', badge: 'bg-emerald-100 text-emerald-800 border-emerald-300', icon: ShieldCheck };
      case 'kepala_sekolah':
        return { label: 'Kepala Sekolah', badge: 'bg-blue-100 text-blue-800 border-blue-300', icon: School };
      case 'admin_disdik':
        return { label: 'Admin Disdik Garut', badge: 'bg-amber-100 text-amber-800 border-amber-300', icon: UserCheck };
    }
  };

  const currentRoleInfo = getRoleLabel(currentRole);
  const RoleIcon = currentRoleInfo.icon;

  return (
    <nav className="bg-white shadow-md p-3 sm:p-4 sticky top-0 z-40 border-b border-emerald-800/10 no-print">
      <div className="container mx-auto flex flex-wrap justify-between items-center gap-3">
        {/* Brand with Garut Emblem */}
        <div 
          onClick={() => onSelectTab('beranda')}
          className="flex items-center space-x-3.5 cursor-pointer group"
        >
          <LogoGarut className="h-11 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105 drop-shadow-sm" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-extrabold text-emerald-900 tracking-tight leading-tight">
                E-PKKS Kab. Garut
              </h1>
              <span className="hidden sm:inline-block text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                Resmi
              </span>
            </div>
            <p className="text-xs text-gray-500 font-medium">Dinas Pendidikan Kabupaten Garut</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="hidden lg:flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={() => onSelectTab('beranda')}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'beranda'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'text-gray-600 hover:text-emerald-700 hover:bg-gray-50'
            }`}
          >
            Beranda
          </button>
          <button
            onClick={() => onSelectTab('profil')}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'profil'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'text-gray-600 hover:text-emerald-700 hover:bg-gray-50'
            }`}
          >
            Profil Sekolah
          </button>
          <button
            onClick={() => onSelectTab('instrumen')}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'instrumen'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'text-gray-600 hover:text-emerald-700 hover:bg-gray-50'
            }`}
          >
            Instrumen PKKS
          </button>
          <button
            onClick={() => onSelectTab('bukti')}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'bukti'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'text-gray-600 hover:text-emerald-700 hover:bg-gray-50'
            }`}
          >
            Bukti Fisik
          </button>
          <button
            onClick={() => onSelectTab('hasil')}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'hasil'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'text-gray-600 hover:text-emerald-700 hover:bg-gray-50'
            }`}
          >
            Hasil & Berita Acara
          </button>
          <button
            onClick={onOpenPanduan}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:text-emerald-700 hover:bg-gray-50 transition-all"
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            Panduan
          </button>
          <button
            onClick={onOpenBersihkanData}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-rose-700 hover:text-rose-900 hover:bg-rose-50 transition-all border border-rose-200/80 shadow-2xs cursor-pointer"
            title="Bersihkan atau reset data penilaian"
          >
            <Trash2 className="w-4 h-4 text-rose-600" />
            <span>Bersihkan Data</span>
          </button>
        </div>

        {/* Role Selector & Login Button */}
        <div className="flex items-center gap-2">
          {/* Role Indicator & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs sm:text-sm font-medium transition-all shadow-xs ${currentRoleInfo.badge}`}
              title="Ganti Mode Pengguna"
            >
              <RoleIcon className="w-4 h-4" />
              <div className="text-left hidden sm:block">
                <span className="block text-[10px] uppercase font-bold text-gray-500">Mode Akses:</span>
                <span className="font-bold">{currentRoleInfo.label}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 opacity-70 ml-0.5" />
            </button>

            {roleDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setRoleDropdownOpen(false)} 
                />
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Pilih Hak Akses Akun</p>
                    <p className="text-xs text-gray-600 mt-0.5">Sesuaikan wewenang penilaian & pengisian.</p>
                  </div>

                  <button
                    onClick={() => {
                      onSelectRole('pengawas');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 flex items-start gap-2.5 hover:bg-emerald-50 transition-colors ${
                      currentRole === 'pengawas' ? 'bg-emerald-50/70 font-semibold text-emerald-800' : 'text-gray-700'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 mt-0.5 text-emerald-600" />
                    <div>
                      <div className="text-xs font-bold text-gray-900">Pengawas Pembina</div>
                      <div className="text-[11px] text-gray-500">Memberi skor, catatan rubrik & mengesahkan berita acara.</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onSelectRole('kepala_sekolah');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 flex items-start gap-2.5 hover:bg-blue-50 transition-colors ${
                      currentRole === 'kepala_sekolah' ? 'bg-blue-50/70 font-semibold text-blue-800' : 'text-gray-700'
                    }`}
                  >
                    <School className="w-4 h-4 mt-0.5 text-blue-600" />
                    <div>
                      <div className="text-xs font-bold text-gray-900">Kepala Sekolah (Auditee)</div>
                      <div className="text-[11px] text-gray-500">Mengisi profil sekolah & mengunggah bukti fisik digital.</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onSelectRole('admin_disdik');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 flex items-start gap-2.5 hover:bg-amber-50 transition-colors ${
                      currentRole === 'admin_disdik' ? 'bg-amber-50/70 font-semibold text-amber-800' : 'text-gray-700'
                    }`}
                  >
                    <UserCheck className="w-4 h-4 mt-0.5 text-amber-600" />
                    <div>
                      <div className="text-xs font-bold text-gray-900">Dinas Pendidikan Garut</div>
                      <div className="text-[11px] text-gray-500">Monitoring seluruh sekolah kecamatan se-Kabupaten Garut.</div>
                    </div>
                  </button>

                  <div className="border-t border-gray-100 mt-1 pt-1 px-3 py-1">
                    <button
                      onClick={() => {
                        onOpenBersihkanData();
                        setRoleDropdownOpen(false);
                      }}
                      className="w-full text-left text-[11px] text-rose-700 hover:text-rose-900 font-semibold flex items-center gap-1.5 py-1.5 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                      Kelola & Bersihkan Data...
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            onClick={() => onSelectTab('hasil')}
            className="bg-emerald-700 text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-lg hover:bg-emerald-800 transition shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Berita Acara</span>
            <span className="sm:hidden">Cetak</span>
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation */}
      <div className="flex lg:hidden overflow-x-auto gap-1 mt-2.5 pt-2 border-t border-gray-100 text-xs font-medium no-scrollbar">
        <button
          onClick={() => onSelectTab('beranda')}
          className={`px-2.5 py-1.5 rounded whitespace-nowrap ${
            activeTab === 'beranda' ? 'bg-emerald-700 text-white font-bold' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Beranda
        </button>
        <button
          onClick={() => onSelectTab('profil')}
          className={`px-2.5 py-1.5 rounded whitespace-nowrap ${
            activeTab === 'profil' ? 'bg-emerald-700 text-white font-bold' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Profil Sekolah
        </button>
        <button
          onClick={() => onSelectTab('instrumen')}
          className={`px-2.5 py-1.5 rounded whitespace-nowrap ${
            activeTab === 'instrumen' ? 'bg-emerald-700 text-white font-bold' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Instrumen PKKS
        </button>
        <button
          onClick={() => onSelectTab('bukti')}
          className={`px-2.5 py-1.5 rounded whitespace-nowrap ${
            activeTab === 'bukti' ? 'bg-emerald-700 text-white font-bold' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Bukti Fisik
        </button>
        <button
          onClick={() => onSelectTab('hasil')}
          className={`px-2.5 py-1.5 rounded whitespace-nowrap ${
            activeTab === 'hasil' ? 'bg-emerald-700 text-white font-bold' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Hasil & Rekap
        </button>
        <button
          onClick={onOpenPanduan}
          className="px-2.5 py-1.5 rounded whitespace-nowrap text-emerald-700 font-semibold hover:bg-gray-100"
        >
          Panduan
        </button>
        <button
          onClick={onOpenBersihkanData}
          className="px-2.5 py-1.5 rounded whitespace-nowrap text-rose-700 font-semibold hover:bg-rose-50 flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Bersihkan Data
        </button>
      </div>
    </nav>
  );
};
