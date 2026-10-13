import { ProfilSekolah, KomponenPKKS, IndikatorPKKS, BuktiFisikItem } from '../types/pkks';

export const KECAMATAN_GARUT: string[] = [
  'Tarogong Kidul',
  'Tarogong Kaler',
  'Garut Kota',
  'Karangpawitan',
  'Wanaraja',
  'Pangatikan',
  'Sucinaraja',
  'Banyuresmi',
  'Leles',
  'Kadungora',
  'Cibiuk',
  'Leuwigoong',
  'Cibatu',
  'Kersamanah',
  'Malangbong',
  'Sukawening',
  'Karangtengah',
  'Blubur Limbangan',
  'Selaawi',
  'Samarang',
  'Pasirwangi',
  'Bayongbong',
  'Cilawu',
  'Cisurupan',
  'Sukaresmi',
  'Cikajang',
  'Cigedug',
  'Banjarwangi',
  'Singajaya',
  'Pancatengah',
  'Peundeuy',
  'Cisompet',
  'Pameungpeuk',
  'Cibalong',
  'Cikelet',
  'Bungbulang',
  'Mekarmukti',
  'Pakenjeng',
  'Pamulihan',
  'Caringin',
  'Cisewu',
  'Talegong'
];

export const DEFAULT_PROFIL_SEKOLAH: ProfilSekolah = {
  namaSekolah: 'SMP Negeri 1 Tarogong Kidul',
  npsn: '20209458',
  nss: '201021102001',
  jenjang: 'SMP',
  statusSekolah: 'Negeri',
  kecamatan: 'Tarogong Kidul',
  alamat: 'Jl. Pembangunan No. 82, Jayawaras, Kec. Tarogong Kidul, Kab. Garut',
  akreditasi: 'A',
  email: 'smpn1tarogongkidul@garutkab.go.id',
  telepon: '(0262) 231456',

  namaKepalaSekolah: 'Drs. H. Maman Suherman, M.Pd.',
  nipKepalaSekolah: '19680512 199303 1 004',
  nuptkKepalaSekolah: '4539746648200012',
  pangkatGolonganKepalaSekolah: 'Pembina Utama Muda / IV-c',
  pendidikanTerakhirKepalaSekolah: 'S2 Manajemen Pendidikan',
  tmtKepalaSekolah: '01 Juli 2021',
  periodePenilaian: 'Tahun 2025/2026',
  tanggalPenilaian: '2026-10-15',

  namaPengawas: 'Hj. Neneng Rohayati, M.Pd.',
  nipPengawas: '19670821 199103 2 005',
  pangkatGolonganPengawas: 'Pengawas Sekolah Ahli Madya / IV-b',
  namaPengawas2: 'Drs. Aep Saepudin, M.M.Pd.',
  nipPengawas2: '19700315 199512 1 002'
};

export const KOMPONEN_LIST: KomponenPKKS[] = [
  {
    id: 1,
    nama: 'Kompetensi Manajerial',
    singkatan: 'Manajerial',
    bobotPersen: 40,
    deskripsi: 'Pengelolaan perencanaan, kurikulum, kesiswaan, sarana prasarana, PTK, keuangan (BOS/ARKAS), dan sistem informasi.',
    ikon: 'school'
  },
  {
    id: 2,
    nama: 'Pengembangan Kewirausahaan',
    singkatan: 'Kewirausahaan',
    bobotPersen: 20,
    deskripsi: 'Inovasi kelembagaan, daya juang pantang menyerah, motivasi warga sekolah, dan penciptaan kemitraan bermakna.',
    ikon: 'lightbulb'
  },
  {
    id: 3,
    nama: 'Supervisi Guru dan Tendik',
    singkatan: 'Supervisi',
    bobotPersen: 30,
    deskripsi: 'Perencanaan, pelaksanaan observasi kelas/pembelajaran, evaluasi hasil supervisi, dan pembinaan tindak lanjut guru.',
    ikon: 'clipboard-check'
  },
  {
    id: 4,
    nama: 'Pengembangan Keprofesian Berkelanjutan (PKB)',
    singkatan: 'PKB & Prestasi',
    bobotPersen: 10,
    deskripsi: 'Pengembangan diri kepala sekolah (pelatihan/MKKS), publikasi ilmiah, dan karya inovatif kepemimpinan sekolah.',
    ikon: 'award'
  }
];

export const DEFAULT_INDIKATOR_LIST: IndikatorPKKS[] = [
  // KOMPONEN 1: MANAJERIAL (1.1 - 1.8)
  {
    id: 'M-01',
    komponenId: 1,
    kode: '1.1',
    subKomponen: 'Perencanaan Program Sekolah',
    pernyataan: 'Menyusun Rencana Kerja Jangka Menengah (RKJM 4 tahun) dan Rencana Kerja Tahunan (RKT/RKAS) berbasis data Rapor Pendidikan.',
    kriteriaSkor: {
      1: 'Belum memiliki RKJM/RKT yang tersusun secara sistematis dan belum berbasis evaluasi diri sekolah/rapor pendidikan.',
      2: 'Memiliki RKT namun belum memuat indikator prioritas Rapor Pendidikan dan belum melibatkan komite sekolah.',
      3: 'Memiliki RKJM dan RKT/RKAS lengkap berbasis Rapor Pendidikan, sudah divalidasi pengawas namun belum dipublikasikan.',
      4: 'Memiliki RKJM dan RKT/RKAS mutakhir berbasis rekomendasi Rapor Pendidikan, disahkan Kepala Dinas/Pengawas, serta disosialisasikan terbuka kepada seluruh pemangku kepentingan.'
    },
    buktiFisikWajib: ['Dokumen RKJM (4 Tahunan)', 'Dokumen RKT dan RKAS Berjalan', 'Laporan Analisis Profil Rapor Pendidikan', 'Berita Acara Rapat Pleno bersama Komite Sekolah'],
    skor: 4,
    catatanPengawas: 'RKJM dan RKAS sangat komprehensif, berbasis capaian literasi dan numerasi Rapor Pendidikan Garut.'
  },
  {
    id: 'M-02',
    komponenId: 1,
    kode: '1.2',
    subKomponen: 'Pengelolaan Kurikulum Operasional',
    pernyataan: 'Mengembangkan dan mengelola Kurikulum Operasional Satuan Pendidikan (KOSP/KTSP) sesuai karakteristik dan potensi daerah Garut.',
    kriteriaSkor: {
      1: 'Dokumen kurikulum hanya salinan (copy-paste) sekolah lain tanpa penyesuaian konteks satuan pendidikan.',
      2: 'Memiliki dokumen kurikulum tersendiri namun belum memuat pengorganisasian muatan lokal dan P5/projek kontekstual.',
      3: 'Dokumen KOSP lengkap dengan modul ajar, asesmen, dan muatan lokal khas Garut, telah divalidasi oleh Tim Pengawas.',
      4: 'Dokumen KOSP unggul, berdiferensiasi kontekstual kearifan lokal Garut (Dodol, Kulit, Seni Sunda), direview berkala melibatkan pakar pendidikan dan orang tua murid.'
    },
    buktiFisikWajib: ['Buku KOSP/KTSP yang disahkan Kadisdik Garut', 'SK Tim Pengembang Kurikulum (TPK)', 'Modul Projek Penguatan Profil Pelajar Pancasila (P5)', 'Contoh Modul Ajar Berdiferensiasi'],
    skor: 4,
    catatanPengawas: 'KOSP telah disahkan Dinas Pendidikan Kabupaten Garut dengan muatan kearifan lokal yang kuat.'
  },
  {
    id: 'M-03',
    komponenId: 1,
    kode: '1.3',
    subKomponen: 'Pengelolaan Kesiswaan',
    pernyataan: 'Mengelola layanan kesiswaan secara adil, transparan, pencegahan perundungan (TPPK), serta pembinaan bakat dan minat.',
    kriteriaSkor: {
      1: 'Administrasi kesiswaan belum tertib, belum ada Tim Pencegahan dan Penanganan Kekerasan (TPPK).',
      2: 'PPDB terlaksana namun program ekstrakurikuler pasif dan TPPK belum memiliki SK serta program kerja aktif.',
      3: 'PPDB transparan, SK TPPK terdaftar di Dapodik, kegiatan ekstrakurikuler aktif menghasilkan kejuaraan tingkat kecamatan/kabupaten.',
      4: 'Layanan kesiswaan prima, Posko TPPK aktif dan ramah anak, pembinaan prestasi terstruktur dengan raihan medali tingkat Provinsi/Nasional serta sistem pelacakan alumni.'
    },
    buktiFisikWajib: ['SK Tim Pencegahan dan Penanganan Kekerasan (TPPK)', 'Laporan Pelaksanaan PPDB Online/Offline', 'Buku Induk Kesiswaan dan Catatan Konseling BK', 'Daftar Prestasi Siswa & Dokumentasi Ekskul'],
    skor: 3,
    catatanPengawas: 'Prestasi O2SN dan FLS2N tingkat Kabupaten Garut terpantau sangat baik; penanganan TPPK berjalan optimal.'
  },
  {
    id: 'M-04',
    komponenId: 1,
    kode: '1.4',
    subKomponen: 'Pengelolaan Sarana dan Prasarana',
    pernyataan: 'Mengelola dan memelihara fasilitas belajar, sarana digital/laboratorium, perpustakaan, sanitasi layak, dan keamanan lingkungan sekolah.',
    kriteriaSkor: {
      1: 'Pencatatan inventaris sarpras tidak tertib, sanitasi kurang terawat dan belum terdata di Dapodik.',
      2: 'Data inventaris sarpras tersedia tetapi buku pemeliharaan berkala belum rutin dilaksanakan.',
      3: 'Sarana terpelihara dengan baik, sinkronisasi Sarpras Dapodik akurat, rasio toilet ramah siswa memadai.',
      4: 'Sarana prasarana modern (smart classroom/chromebook), lingkungan hijau bersih (Adiwiyata), sistem inventarisasi digital dengan QR Code dan SOP keselamatan lengkap.'
    },
    buktiFisikWajib: ['Buku Inventaris Barang Sekolah (KIR)', 'Laporan Sinkronisasi Sarpras di Dapodik', 'Kartu Riwayat Pemeliharaan Gedung & Sanitasi', 'Foto Sarana Belajar dan Perpustakaan'],
    skor: 3,
    catatanPengawas: 'Kondisi ruang kelas dan laboratorium komputer tertata rapi. Perlu peningkatan koleksi buku perpustakaan digital.'
  },
  {
    id: 'M-05',
    komponenId: 1,
    kode: '1.5',
    subKomponen: 'Pengelolaan Pendidik dan Tenaga Kependidikan',
    pernyataan: 'Mengelola pembagian tugas mengajar, peningkatan kompetensi guru di Platform Merdeka Mengajar (PMM), dan penilaian kinerja guru (PKG).',
    kriteriaSkor: {
      1: 'Tidak ada SK pembagian tugas tertulis, belum melaksanakan PKG secara berkala.',
      2: 'Ada SK pembagian tugas namun belum optimal memfasilitasi Komunitas Belajar (Kombel) dan PMM.',
      3: 'SK pembagian tugas tertib, Komunitas Belajar (Kombel) sekolah aktif terdaftar di PMM, PKG terlaksana 100%.',
      4: 'Manajemen SDM sangat dinamis, 100% guru aktif bersertifikat topik PMM, Kombel sekolah menjadi rujukan kecamatan, penghargaan kinerja berkala bagi guru berdedikasi.'
    },
    buktiFisikWajib: ['SK Pembagian Tugas Mengajar dan Tugas Tambahan', 'Laporan Hasil Penilaian Kinerja Guru (PKG)', 'Sertifikat & Log Aktivitas Komunitas Belajar (Kombel) di PMM', 'Daftar Hadir Fingerprint / Presensi Digital PTK'],
    skor: 4,
    catatanPengawas: 'Seluruh guru telah menyelesaikan topik PMM dan Kombel rutin mengadakan lokakarya bulanan.'
  },
  {
    id: 'M-06',
    komponenId: 1,
    kode: '1.6',
    subKomponen: 'Pengelolaan Keuangan dan Pembiayaan (BOS & ARKAS)',
    pernyataan: 'Mengelola anggaran sekolah (BOS Reguler/Kinerja) secara transparan, akuntabel, tepat waktu, dan tertib melalui aplikasi ARKAS.',
    kriteriaSkor: {
      1: 'SPJ BOS sering terlambat, pembukuan manual belum tertib dan belum menggunakan ARKAS secara tuntas.',
      2: 'Menggunakan ARKAS namun penutupan BKU sering lewat batas waktu dan tidak ada papan transparansi dana BOS.',
      3: 'Penatausahaan ARKAS tertib, BKU ditutup tepat waktu, pelaporan semesteran dan SPTJM lengkap tanpa temuan inspektorat.',
      4: 'Tata kelola keuangan bebas temuan audit, transparansi publik terpampang di papan informasi dan website, serapan anggaran efektif berdampak langsung pada mutu pembelajaran.'
    },
    buktiFisikWajib: ['RKAS Perubahan yang disahkan Tim BOS Disdik', 'Buku Kas Umum (BKU) dan Bukti Penutupan Kas ARKAS', 'SPTJM (Surat Pernyataan Tanggung Jawab Mutlak)', 'Dokumentasi Papan Informasi Transparansi Penggunaan BOS'],
    skor: 4,
    catatanPengawas: 'Laporan BKU ARKAS tertib dan nihil catatan pemeriksaan BPK/Inspektorat.'
  },
  {
    id: 'M-07',
    komponenId: 1,
    kode: '1.7',
    subKomponen: 'Hubungan Kemitraan Sekolah dan Masyarakat',
    pernyataan: 'Membangun sinergi kemitraan bersama Komite Sekolah, orang tua wali, kepolisian/puskesmas setempat, dan dunia usaha/dunia industri.',
    kriteriaSkor: {
      1: 'Komite sekolah tidak aktif dan tidak ada komunikasi teratur dengan orang tua murid.',
      2: 'Rapat komite hanya dilakukan saat awal tahun ajaran baru, belum ada nota kesepahaman (MoU) eksternal.',
      3: 'Komite sekolah berperan aktif memberi masukan, terdapat MoU dengan Puskesmas (skrining kesehatan) dan Polsek/Koramil.',
      4: 'Kemitraan multi-pihak berjalan harmonis, program parenting rutin, program magang/kunjungan industri terintegrasi dengan dukungan penuh paguyuban alumni.'
    },
    buktiFisikWajib: ['SK Kepengurusan Komite Sekolah Berjalan', 'Notula Rapat Pleno dan Berita Acara Pertemuan Wali Murid', 'Naskah Perjanjian Kerjasama (MoU) dengan Puskesmas/Instansi', 'Laporan Program Parenting dan Kolaborasi Masyarakat'],
    skor: 3,
    catatanPengawas: 'Kerjasama dengan Puskesmas dan Koramil setempat terjalin intensif untuk pembinaan karakter siswa.'
  },
  {
    id: 'M-08',
    komponenId: 1,
    kode: '1.8',
    subKomponen: 'Sistem Informasi Manajemen Sekolah',
    pernyataan: 'Mengelola sistem informasi digital sekolah, keakuratan data Dapodik, komunikasi medsos, dan layanan aduan masyarakat.',
    kriteriaSkor: {
      1: 'Dapodik tidak sinkron tepat waktu dan sekolah tidak memiliki kanal informasi digital.',
      2: 'Dapodik terisi tetapi data guru/sarpras belum mutakhir, media sosial jarang diperbarui.',
      3: 'Sinkronisasi Dapodik selalu 100% tepat waktu, website/medsos resmi aktif menyampaikan prestasi dan agenda.',
      4: 'Sistem informasi sekolah terpadu (Dapodik, presensi online, e-rapor, LMS sekolah), kanal aduan cepat tanggap dan keamanan data terjamin.'
    },
    buktiFisikWajib: ['Lembar Verifikasi dan Validasi Sinkronisasi Dapodik', 'Tangkapan Layar Dashboard Website / Medsos Resmi', 'SOP Layanan Informasi dan Pengaduan Masyarakat', 'Arsip Penerbitan Buku Rapor Digital (e-Rapor)'],
    skor: 4,
    catatanPengawas: 'Data Dapodik sinkron 100% dan publikasi kegiatan sekolah di portal online sangat aktif.'
  },

  // KOMPONEN 2: PENGEMBANGAN KEWIRAUSAHAAN (2.1 - 2.4)
  {
    id: 'W-01',
    komponenId: 2,
    kode: '2.1',
    subKomponen: 'Inovasi Pembelajaran dan Tata Kelola',
    pernyataan: 'Menciptakan terobosan dan inovasi yang berdampak nyata pada peningkatan kualitas pembelajaran dan efisiensi manajemen.',
    kriteriaSkor: {
      1: 'Belum melahirkan gagasan inovasi baru, masih menerapkan cara-cara konvensional tanpa pembaharuan.',
      2: 'Terdapat ide inovasi namun belum dituangkan dalam proposal program kerja dan belum dirasakan manfaatnya secara luas.',
      3: 'Memiliki program inovasi teruji (misal: Pojok Literasi Digital, Bank Sampah Sekolah, atau Pembelajaran Berbasis Proyek Kearifan Lokal).',
      4: 'Program inovasi berprestasi di tingkat Kabupaten Garut / Jawa Barat, memiliki payung regulasi internal, terdokumentasi rapi dalam video/modul serta direplikasi sekolah lain.'
    },
    buktiFisikWajib: ['Dokumen Proposal & Laporan Program Inovasi Sekolah', 'Dokumentasi Video / Foto Implementasi Inovasi', 'Piagam / Sertifikat Apresiasi Inovasi Dinas Pendidikan', 'Testimoni Siswa dan Guru terhadap Inovasi'],
    skor: 4,
    catatanPengawas: 'Inovasi "Green School Batik Eco-Print Garutan" berjalan sangat inspiratif dan membina jiwa mandiri murid.'
  },
  {
    id: 'W-02',
    komponenId: 2,
    kode: '2.2',
    subKomponen: 'Daya Juang dan Pantang Menyerah',
    pernyataan: 'Menunjukkan komitmen tinggi, ketangguhan, dan keberanian mengambil solusi kreatif saat menghadapi keterbatasan dana maupun fasilitas.',
    kriteriaSkor: {
      1: 'Sikap pasif dan cenderung menyalahkan keterbatasan anggaran atau letak geografis sekolah.',
      2: 'Mampu menyelesaikan masalah teknis ringan namun ragu mengambil terobosan saat menghadapi hambatan struktural.',
      3: 'Gigih mencari alternatif pembiayaan halal (swadaya, CSR, alumni) untuk mengatasi kendala sarana ruang kelas atau laboratorium.',
      4: 'Menjadi role model keteladanan; mampu mentransformasi sekolah dari kondisi terbatas menjadi sekolah percontohan dengan dukungan solid warga sekolah.'
    },
    buktiFisikWajib: ['Dokumen Catatan Kasus dan Solusi Strategis Kepala Sekolah', 'Bukti Penggalangan Dukungan Non-APBD (Bantuan Alumni/CSR)', 'Foto Kondisi Sebelum dan Sesudah Perbaikan Fasilitas', 'Laporan Manajemen Risiko Sekolah'],
    skor: 3,
    catatanPengawas: 'Kepala Sekolah proaktif merangkul paguyuban orang tua dan alumni dalam renovasi mushola sekolah.'
  },
  {
    id: 'W-03',
    komponenId: 2,
    kode: '2.3',
    subKomponen: 'Motivasi Berprestasi bagi Warga Sekolah',
    pernyataan: 'Menumbuhkan iklim kompetisi sehat, budaya mutu, serta pemberian apresiasi/reward bagi guru, staf, dan siswa berprestasi.',
    kriteriaSkor: {
      1: 'Tidak ada dorongan partisipasi lomba, tidak pernah memberikan apresiasi bagi capaian murid/guru.',
      2: 'Mengikutsertakan siswa pada lomba namun tanpa pembinaan terprogram dan tanpa sistem penghargaan.',
      3: 'Terdapat tim pembina OSN/FLS2N/O2SN, pemberian sertifikat apresiasi berkala pada upacara bendera.',
      4: 'Budaya apresiasi membudaya (reward semesteran guru teladan & siswa teladan), target capaian prestasi tertuang di RKT dan terealisasi dengan rekor prestasi membanggakan.'
    },
    buktiFisikWajib: ['SK Tim Pembina Prestasi Akademik dan Non-Akademik', 'Piagam Penghargaan Guru dan Siswa Berprestasi Internal', 'Laporan Keikutsertaan Lomba Tingkat Kabupaten/Provinsi', 'Dokumentasi Penyerahan Apresiasi'],
    skor: 4,
    catatanPengawas: 'Sistem reward berkala memicu semangat dedikasi luar biasa pada seluruh pendidik dan peserta didik.'
  },
  {
    id: 'W-04',
    komponenId: 2,
    kode: '2.4',
    subKomponen: 'Naluri Kewirausahaan & Unit Produksi/Jasa',
    pernyataan: 'Mengembangkan unit usaha sekolah (koperasi sekolah, kantin sehat ramah gizi, atau hasil karya siswa) untuk mendidik kecakapan hidup.',
    kriteriaSkor: {
      1: 'Tidak ada unit usaha sekolah, kantin kumuh tanpa standar kesehatan.',
      2: 'Ada koperasi atau kantin namun belum berbadan hukum/tidak terkelola transparan.',
      3: 'Koperasi sekolah aktif, kantin sehat bersertifikat pengawasan puskesmas, ada pameran karya kewirausahaan siswa tahunan.',
      4: 'Unit produksi/jasa mandiri dikelola profesional sebagai laboratorium kewirausahaan siswa dengan perputaran dana sehat dan laporan RAT berkala.'
    },
    buktiFisikWajib: ['Laporan Pertanggungjawaban Koperasi Sekolah / Kantin Sehat', 'Sertifikat Laik Higiene Sanitasi dari Puskesmas Garut', 'Katalog / Dokumentasi Karya Kewirausahaan Siswa (Market Day)', 'Buku Kas Unit Produksi Sekolah'],
    skor: 3,
    catatanPengawas: 'Kantin sehat dan kegiatan Market Day teratur memberi edukasi langsung literasi finansial anak.'
  },

  // KOMPONEN 3: SUPERVISI GURU DAN TENDIK (3.1 - 3.3)
  {
    id: 'S-01',
    komponenId: 3,
    kode: '3.1',
    subKomponen: 'Perencanaan Supervisi Akademik',
    pernyataan: 'Menyusun program tahunan supervisi akademik, jadwal observasi kelas, dan instrumen telaah modul ajar/RPS secara komprehensif.',
    kriteriaSkor: {
      1: 'Belum menyusun program dan instrumen supervisi akademik.',
      2: 'Program supervisi ada tetapi jadwal tidak terdistribusi merata dan instrumen masih format lama.',
      3: 'Program supervisi lengkap memuat jadwal, sasaran seluruh guru mapel, dan instrumen telaah Kurikulum Merdeka.',
      4: 'Program supervisi dirancang berbasis diagnostik kebutuhan guru, disosialisasikan di rapat dinas awal tahun, dan memadukan supervisi klinis dengan pendekatan coaching modern.'
    },
    buktiFisikWajib: ['Buku Rencana Program Supervisi Akademik Tahunan', 'Jadwal Supervisi Guru Mapel / Guru Kelas', 'Instrumen Telaah Modul Ajar / RPP Berdiferensiasi', 'Daftar Hadir Sosialisasi Program Supervisi'],
    skor: 4,
    catatanPengawas: 'Jadwal dan instrumen supervisi klinis tersusun sangat sistematis mencakup seluruh jenjang kelas.'
  },
  {
    id: 'S-02',
    komponenId: 3,
    kode: '3.2',
    subKomponen: 'Pelaksanaan Supervisi Pembelajaran & Tendik',
    pernyataan: 'Melaksanakan observasi pembelajaran di ruang kelas secara langsung sesuai jadwal dengan instrumen baku, serta supervisi tendik.',
    kriteriaSkor: {
      1: 'Pelaksanaan supervisi tidak mencapai 50% target guru dan tidak ada bukti lembar observasi.',
      2: 'Observasi hanya dilakukan pada sebagian guru senior, supervisi tenaga kependidikan (TU/Perpus) terabaikan.',
      3: 'Observasi terlaksana 100% target guru dan tendik dengan lembar instrumen terisi lengkap dan bertandatangan.',
      4: 'Supervisi terlaksana prima 100%, suasana observasi hangat dan suportif, dilengkapi rekaman video microteaching/foto, serta rubrik observasi perilaku kinerja guru yang transparan.'
    },
    buktiFisikWajib: ['Lembar Instrumen Observasi Kelas Terisi dan Bertandatangan', 'Daftar Nilai Hasil Supervisi Seluruh Guru', 'Instrumen Supervisi Tenaga Kependidikan (TU, Lab, Perpus)', 'Foto Dokumentasi Pelaksanaan Kunjungan Kelas'],
    skor: 4,
    catatanPengawas: 'Semua guru telah diobservasi di kelas dengan lembar telaah asesmen formatif yang valid.'
  },
  {
    id: 'S-03',
    komponenId: 3,
    kode: '3.3',
    subKomponen: 'Evaluasi dan Tindak Lanjut Hasil Supervisi',
    pernyataan: 'Menganalisis hasil supervisi, memberikan umpan balik (feedback coaching), dan menyelenggarakan program tindak lanjut pembinaan.',
    kriteriaSkor: {
      1: 'Hasil supervisi hanya disimpan sebagai arsip tanpa pernah diberikan umpan balik ke guru.',
      2: 'Ada catatan umpan balik namun tidak ada program tindak lanjut seperti workshop atau pelatihan lanjutan.',
      3: 'Memberikan umpan balik terstruktur ke guru dan menugaskan guru yang perlu penguatan untuk ikut pelatihan di PMM/Kombel.',
      4: 'Tindak lanjut supervisi terbukti meningkatkan mutu pengajaran guru secara signifikan, ada sesi coaching 1-on-1, serta diseminasi praktik baik antar guru di forum KKG/MGMP Garut.'
    },
    buktiFisikWajib: ['Buku Catatan Feedback Pembinaan Pasca Supervisi', 'Laporan Rekapitulasi Analisis Hasil Supervisi', 'Bukti Tindak Lanjut (Surat Tugas Workshop / Sertifikat PMM)', 'Dokumentasi Rapat Refleksi Bersama Guru'],
    skor: 3,
    catatanPengawas: 'Coaching pasca-observasi telah dilakukan; disarankan agar materi tindak lanjut dipresentasikan di MGMP Sub-Rayon.'
  },

  // KOMPONEN 4: PENGEMBANGAN KEPROFESIAN BERKELANJUTAN (PKB) (4.1 - 4.2)
  {
    id: 'P-01',
    komponenId: 4,
    kode: '4.1',
    subKomponen: 'Pengembangan Diri Kepala Sekolah',
    pernyataan: 'Mengikuti diklat fungsional, bimbingan teknis kepemimpinan sekolah, seminar nasional, serta aktif dalam forum MKKS/K3S Kabupaten Garut.',
    kriteriaSkor: {
      1: 'Tidak memiliki sertifikat peningkatan kompetensi kepala sekolah dalam 1 tahun terakhir.',
      2: 'Hanya memiliki 1 sertifikat webinar dan jarang menghadiri pertemuan koordinasi MKKS/K3S.',
      3: 'Memiliki 2-3 sertifikat pelatihan kepemimpinan/manajerial dari Kemendikbud/Disdik Garut dan aktif di MKKS.',
      4: 'Aktif sebagai narasumber praktik baik / pengurus aktif MKKS Kabupaten Garut, mengantongi sertifikat diklat berjam pelajaran tinggi (PKS/Kurikulum Merdeka).'
    },
    buktiFisikWajib: ['Sertifikat Pelatihan / Diklat Manajerial Kepala Sekolah', 'Surat Tugas dari Dinas Pendidikan Kabupaten Garut', 'Bukti Keaktifan Organisasi Profesi MKKS / K3S Garut', 'Laporan Desain Pengembangan Diri'],
    skor: 4,
    catatanPengawas: 'Sangat aktif sebagai pengurus MKKS dan rajin memperbarui sertifikasi kepemimpinan pembelajaran.'
  },
  {
    id: 'P-02',
    komponenId: 4,
    kode: '4.2',
    subKomponen: 'Publikasi Ilmiah dan Karya Inovatif',
    pernyataan: 'Menghasilkan karya tulis ilmiah (Best Practice / PTS), artikel di media massa, buku referensi ber-ISBN, atau karya inovasi manajemen.',
    kriteriaSkor: {
      1: 'Belum pernah menyusun laporan Best Practice atau karya tulis kepemimpinan sekolah.',
      2: 'Pernah membuat draf Best Practice namun belum diseminarkan atau belum memenuhi kaidah penulisan ilmiah.',
      3: 'Memiliki 1 laporan Best Practice kepemimpinan yang diseminarkan di tingkat gugus/MKKS dan didokumentasikan di perpustakaan.',
      4: 'Memiliki laporan Best Practice berpredikat juara / artikel dimuat jurnal terakreditasi / buku ber-ISBN tentang manajemen mutu sekolah.'
    },
    buktiFisikWajib: ['Naskah Laporan Best Practice Kepala Sekolah Berita Acara Seminar', 'Surat Keterangan Perpustakaan atas Penyerahan Karya Tulis', 'Kliping Artikel Ilmiah / Jurnal / Buku Ber-ISBN', 'Dokumentasi Presentasi Diseminasi Ilmiah'],
    skor: 3,
    catatanPengawas: 'Naskah Best Practice "Model Kepemimpinan Berbasis Kearifan Sunda Garut" sudah diseminarkan di MKKS.'
  }
];

export const DEFAULT_BUKTI_FISIK_LIST: BuktiFisikItem[] = [
  {
    id: 'bf-1',
    indikatorId: 'M-01',
    namaDokumen: 'Dokumen_RKJM_2024_2028_SMPN1_Tarogong.pdf',
    kategori: 'Perencanaan',
    tanggalUnggah: '2026-10-01',
    ukuranFile: '4.2 MB',
    fileType: 'pdf',
    fileUrl: 'https://storage.garutkab.go.id/disdik/pkks/dokumen-rkjm-2024-2028.pdf',
    keterangan: 'Telah disetujui Pengawas Pembina dan disahkan Komite Sekolah',
    statusVerifikasi: 'lengkap',
    catatanVerifikator: 'Sangat rapi, target mutu tahunan terukur jelas.'
  },
  {
    id: 'bf-2',
    indikatorId: 'M-01',
    namaDokumen: 'RKT_dan_RKAS_Murni_2025_2026.pdf',
    kategori: 'Perencanaan',
    tanggalUnggah: '2026-10-02',
    ukuranFile: '3.1 MB',
    fileType: 'pdf',
    fileUrl: 'https://storage.garutkab.go.id/disdik/pkks/rkt-rkas-2025-2026.pdf',
    keterangan: 'Sinkron dengan akun ARKAS BKU Tahunan',
    statusVerifikasi: 'lengkap',
    catatanVerifikator: 'Sesuai dengan pagu anggaran BOS Reguler.'
  },
  {
    id: 'bf-3',
    indikatorId: 'M-02',
    namaDokumen: 'Buku_KOSP_Kurikulum_Merdeka_SMPN1_Tarogong_Kidul.pdf',
    kategori: 'Kurikulum',
    tanggalUnggah: '2026-10-03',
    ukuranFile: '5.8 MB',
    fileType: 'pdf',
    fileUrl: 'https://storage.garutkab.go.id/disdik/pkks/kosp-garut-2025.pdf',
    keterangan: 'Pengesahan Kepala Dinas Pendidikan Kab. Garut No: 421/1042-Disdik/2025',
    statusVerifikasi: 'lengkap',
    catatanVerifikator: 'SK Pengesahan dan modul P5 lengkap.'
  },
  {
    id: 'bf-4',
    indikatorId: 'M-03',
    namaDokumen: 'SK_Tim_Pencegahan_Kekerasan_TPPK_2025.pdf',
    kategori: 'Kesiswaan',
    tanggalUnggah: '2026-10-04',
    ukuranFile: '1.2 MB',
    fileType: 'pdf',
    fileUrl: 'https://storage.garutkab.go.id/disdik/pkks/sk-tppk-2025.pdf',
    keterangan: 'Tercatat aktif di portal kemdikbud.go.id/tppk',
    statusVerifikasi: 'lengkap',
    catatanVerifikator: 'Sudah terpasang banner anti-bullying di selasar sekolah.'
  },
  {
    id: 'bf-5',
    indikatorId: 'M-06',
    namaDokumen: 'Laporan_Tutup_BKU_ARKAS_Semester_1.pdf',
    kategori: 'Keuangan',
    tanggalUnggah: '2026-10-05',
    ukuranFile: '2.5 MB',
    fileType: 'pdf',
    fileUrl: 'https://storage.garutkab.go.id/disdik/pkks/bku-arkas-sem1.pdf',
    keterangan: 'Rekapitulasi pembelanjaan SiPLah dan BKU Bank BJB Garut',
    statusVerifikasi: 'lengkap',
    catatanVerifikator: 'Nihil temuan, administrasi faktur lengkap.'
  },
  {
    id: 'bf-6',
    indikatorId: 'W-01',
    namaDokumen: 'Laporan_Inovasi_Green_School_Eco_Batik_Garutan.pdf',
    kategori: 'Kewirausahaan',
    tanggalUnggah: '2026-10-06',
    ukuranFile: '6.4 MB',
    fileType: 'pdf',
    fileUrl: 'https://storage.garutkab.go.id/disdik/pkks/inovasi-batik-garutan.pdf',
    keterangan: 'Juara II Inovasi Pengelolaan Sekolah Tingkat Kab. Garut',
    statusVerifikasi: 'lengkap',
    catatanVerifikator: 'Karya inovatif yang mendidik kreativitas siswa.'
  },
  {
    id: 'bf-7',
    indikatorId: 'S-01',
    namaDokumen: 'Program_Supervisi_Akademik_Tahun_2025_2026.pdf',
    kategori: 'Supervisi',
    tanggalUnggah: '2026-10-07',
    ukuranFile: '3.8 MB',
    fileType: 'pdf',
    fileUrl: 'https://storage.garutkab.go.id/disdik/pkks/program-supervisi-2025.pdf',
    keterangan: 'Jadwal 32 guru mapel lengkap dengan rubrik telaah',
    statusVerifikasi: 'lengkap',
    catatanVerifikator: 'Matriks waktu dan target supervisi jelas.'
  },
  {
    id: 'bf-8',
    indikatorId: 'P-02',
    namaDokumen: 'Naskah_Best_Practice_Kepala_Sekolah_Garut.pdf',
    kategori: 'PKB',
    tanggalUnggah: '2026-10-08',
    ukuranFile: '2.9 MB',
    fileType: 'pdf',
    fileUrl: 'https://storage.garutkab.go.id/disdik/pkks/best-practice-garut.pdf',
    keterangan: 'Berita acara seminar diseminasi di MKKS Sub-Rayon 01 Garut',
    statusVerifikasi: 'lengkap',
    catatanVerifikator: 'Format sesuai kaidah ilmiah Kemdikbud.'
  }
];

export const FAQ_PANDUAN = [
  {
    tanya: 'Apa dasar hukum pelaksanaan Penilaian Kinerja Kepala Sekolah (PKKS)?',
    jawab: 'Permendikbudristek No. 40 Tahun 2021 tentang Penugasan Guru sebagai Kepala Sekolah, Kepdirjen GTK No. 7327/B.B1/HK.03.01/2023, serta Surat Edaran Kepala Dinas Pendidikan Kabupaten Garut perihal Petunjuk Teknis Pelaksanaan PKKS Tahunan.'
  },
  {
    tanya: 'Siapa yang berwenang melakukan penilaian kinerja?',
    jawab: 'Penilai utama adalah Pengawas Pembina Satuan Pendidikan yang ditugaskan oleh Kepala Dinas Pendidikan Kabupaten Garut dengan SK resmi, dibantu Tim Penilai Rekan Sejawat/Komite bila diperlukan.'
  },
  {
    tanya: 'Bagaimana pembobotan nilai dalam E-PKKS Kabupaten Garut?',
    jawab: 'Kompetensi Manajerial memiliki bobot 40%, Pengembangan Kewirausahaan 20%, Supervisi Guru & Tendik 30%, dan Pengembangan Keprofesian Berkelanjutan (PKB) 10%. Rentang nilai akhir 0-100 dengan batas predikat: Amat Baik (≥91), Baik (76-90), Cukup (61-75), Sedang (51-60), Kurang (<50).'
  },
  {
    tanya: 'Bagaimana mekanisme pengunggahan dan verifikasi bukti fisik digital?',
    jawab: 'Kepala Sekolah atau Tim Penjaminan Mutu Sekolah mengunggah dokumen digital (format PDF/gambar/tautan drive) untuk setiap butir indikator. Pengawas Pembina memvalidasi keabsahan dokumen sebelum menentukan skor akhir 1 s.d. 4.'
  },
  {
    tanya: 'Apakah aplikasi ini dapat mencetak Berita Acara resmi?',
    jawab: 'Ya, sistem secara otomatis menerbitkan Berita Acara Hasil Penilaian Kinerja Kepala Sekolah lengkap dengan Kop Surat Dinas Pendidikan Kabupaten Garut, rincian skor, rekomendasi pembinaan, dan kolom tanda tangan pengesahan resmi.'
  }
];
