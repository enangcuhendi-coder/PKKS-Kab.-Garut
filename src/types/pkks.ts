export type Role = 'pengawas' | 'kepala_sekolah' | 'admin_disdik';

export type JenjangSekolah = 'SD' | 'SMP' | 'PAUD' | 'PKBM';

export interface ProfilSekolah {
  namaSekolah: string;
  npsn: string;
  nss: string;
  jenjang: JenjangSekolah;
  statusSekolah: 'Negeri' | 'Swasta';
  kecamatan: string;
  alamat: string;
  akreditasi: 'A' | 'B' | 'C' | 'Belum Terakreditasi';
  email: string;
  telepon: string;
  
  // Kepala Sekolah
  namaKepalaSekolah: string;
  nipKepalaSekolah: string;
  nuptkKepalaSekolah: string;
  pangkatGolonganKepalaSekolah: string;
  pendidikanTerakhirKepalaSekolah: string;
  tmtKepalaSekolah: string;
  periodePenilaian: string; // e.g. "2025/2026"
  tanggalPenilaian: string;

  // Pengawas Pembina
  namaPengawas: string;
  nipPengawas: string;
  pangkatGolonganPengawas: string;
  namaPengawas2?: string;
  nipPengawas2?: string;
}

export type StatusBukti = 'lengkap' | 'perlu_revisi' | 'belum_lengkap';

export interface BuktiFisikItem {
  id: string;
  indikatorId: string;
  namaDokumen: string;
  kategori: string;
  tanggalUnggah: string;
  ukuranFile?: string;
  fileType: 'pdf' | 'doc' | 'image' | 'link';
  fileUrl?: string;
  keterangan?: string;
  statusVerifikasi: StatusBukti;
  catatanVerifikator?: string;
}

export interface IndikatorPKKS {
  id: string;
  komponenId: number;
  kode: string;
  subKomponen: string;
  pernyataan: string;
  kriteriaSkor: {
    1: string;
    2: string;
    3: string;
    4: string;
  };
  buktiFisikWajib: string[];
  skor: number; // 0 (belum dinilai), 1, 2, 3, 4
  catatanPengawas?: string;
}

export interface KomponenPKKS {
  id: number;
  nama: string;
  singkatan: string;
  bobotPersen: number;
  deskripsi: string;
  ikon: string;
}

export interface HasilPenilaianSummary {
  skorPerolehanKomponen: { [komponenId: number]: { totalSkor: number; maksSkor: number; persentase: number; nilaiTerbobot: number } };
  skorTotalAkhir: number; // 0 - 100
  predikat: 'Amat Baik' | 'Baik' | 'Cukup' | 'Sedang' | 'Kurang';
  predikatHuruf: 'A' | 'B' | 'C' | 'D' | 'E';
  catatanUmumPengawas: string;
  rekomendasiTindakLanjut: string;
}
