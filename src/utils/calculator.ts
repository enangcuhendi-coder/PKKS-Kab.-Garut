import { IndikatorPKKS, KomponenPKKS, HasilPenilaianSummary } from '../types/pkks';

export function hitungHasilPenilaian(
  indikatorList: IndikatorPKKS[],
  komponenList: KomponenPKKS[]
): HasilPenilaianSummary {
  const skorPerolehanKomponen: HasilPenilaianSummary['skorPerolehanKomponen'] = {};
  let totalBobotDihitung = 0;
  let skorTotalAkhir = 0;

  komponenList.forEach((komp) => {
    const listIndikatorKomponen = indikatorList.filter((item) => item.komponenId === komp.id);
    const maksSkor = listIndikatorKomponen.length * 4;
    const totalSkor = listIndikatorKomponen.reduce((acc, curr) => acc + (curr.skor || 0), 0);
    const persentase = maksSkor > 0 ? (totalSkor / maksSkor) * 100 : 0;
    
    // Nilai terbobot komponen = (persentase / 100) * bobotPersen
    const nilaiTerbobot = (persentase / 100) * komp.bobotPersen;

    skorPerolehanKomponen[komp.id] = {
      totalSkor,
      maksSkor,
      persentase: Math.round(persentase * 10) / 10,
      nilaiTerbobot: Math.round(nilaiTerbobot * 100) / 100
    };

    skorTotalAkhir += nilaiTerbobot;
    totalBobotDihitung += komp.bobotPersen;
  });

  const finalScoreRounded = Math.round(skorTotalAkhir * 100) / 100;

  let predikat: HasilPenilaianSummary['predikat'] = 'Kurang';
  let predikatHuruf: HasilPenilaianSummary['predikatHuruf'] = 'E';

  if (finalScoreRounded >= 91) {
    predikat = 'Amat Baik';
    predikatHuruf = 'A';
  } else if (finalScoreRounded >= 76) {
    predikat = 'Baik';
    predikatHuruf = 'B';
  } else if (finalScoreRounded >= 61) {
    predikat = 'Cukup';
    predikatHuruf = 'C';
  } else if (finalScoreRounded >= 51) {
    predikat = 'Sedang';
    predikatHuruf = 'D';
  } else {
    predikat = 'Kurang';
    predikatHuruf = 'E';
  }

  // Buat rekomendasi otomatis jika ada indikator dengan skor <= 3
  const indikatorPerluPeningkatan = indikatorList.filter((i) => i.skor < 4);
  let rekomendasiTindakLanjut = '';

  if (indikatorPerluPeningkatan.length === 0) {
    rekomendasiTindakLanjut = 'Pertahankan kinerja unggul dan jadikan satuan pendidikan sebagai rujukan praktik baik (school benchmarking) di Kabupaten Garut.';
  } else {
    const subPoin = indikatorPerluPeningkatan
      .slice(0, 3)
      .map((i) => `${i.subKomponen} (${i.kode})`)
      .join(', ');
    rekomendasiTindakLanjut = `Fokus peningkatan pada aspek: ${subPoin}. Disarankan memperkuat pendampingan komunitas belajar dan pemanfaatan platform digital.`;
  }

  return {
    skorPerolehanKomponen,
    skorTotalAkhir: finalScoreRounded,
    predikat,
    predikatHuruf,
    catatanUmumPengawas: 'Kinerja Kepala Sekolah secara umum telah memenuhi standar nasional pendidikan dan selaras dengan program prioritas Dinas Pendidikan Kabupaten Garut.',
    rekomendasiTindakLanjut
  };
}

export function formatTanggalIndonesia(tglString: string): string {
  try {
    const date = new Date(tglString);
    if (isNaN(date.getTime())) return tglString;
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  } catch {
    return tglString;
  }
}
