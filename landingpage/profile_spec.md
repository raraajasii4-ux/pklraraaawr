# Spesifikasi Profile — Glow Mate

Dokumen ini merinci fitur halaman Profile pengguna: UI, alur, API, validasi, dan acceptance criteria.

## Tujuan
- Menyediakan halaman Profile rapi dan estetis untuk melihat dan mengedit data pengguna.
- Memungkinkan pengguna mengganti avatar (pilih avatar buah lucu atau unggah foto sendiri).
- Memungkinkan perubahan `username` dan `password` dengan keamanan dan validasi yang tepat.

## Komponen UI (Ringkas)
- Header: Judul "Profile" + tombol back/close.
- Foto profil: lingkaran besar di tengah, tombol edit kecil (ikon pensil) untuk ganti avatar.
- Nama tampilan (`username`) dan email (non-editable atau editable sesuai kebijakan).
- Tombol `Edit Profile` yang membuka form edit:
  - Username (input teks)
  - Age (opsional)
  - Skin type (select)
  - Concerns (multi-select)
  - Preferences (textarea / toggles)
- Seksi Keamanan: tombol `Ubah Username` dan `Ubah Password`.
- Seksi Avatar: pilihan gallery avatar buah (grid) + tombol `Unggah Foto`.
- Tombol aksi: `Simpan` dan `Batal`.
- Notifikasi: toast sukses/gagal; validasi field inline.

### Perilaku & Animasi
- Transisi halus saat membuka modal edit (fade + slide). Animasi micro pada tombol selesai.
- Saat avatar diubah, tampilkan preview sebelum `Simpan`.
- Semua animasi dapat dimatikan di Settings → Accessibility.

## Flow Penggantian Avatar
1. Pengguna klik tombol edit avatar.
2. Modal muncul: opsi pilih avatar buah (grid) atau upload file.
3. Jika pilih avatar: klik satu avatar → preview ditampilkan.
4. Jika upload: validasi tipe file (jpg/png/webp), ukuran ≤ 5MB; tampilkan preview.
5. Pengguna klik `Simpan` → API `PUT /api/user/profile/avatar` dipanggil.
6. Jika sukses: update UI dan tampilkan toast "Avatar berhasil diperbarui".
7. Jika gagal: tampilkan pesan error sesuai kode (size/type/auth).

## Flow Ubah Username
1. Pengguna buka `Ubah Username`.
2. Form: `username baru`, `password saat ini` (verifikasi).
3. Validasi: username unik, 3–30 karakter, hanya huruf/angka/underscore.
4. Submit → API `PUT /api/user/username` dengan body {new_username, current_password}.
5. Jika password benar dan username tersedia → sukses; update session/claims jika perlu.
6. Jika gagal → berikan pesan spesifik ("password salah", "username sudah dipakai").

## Flow Ubah Password
1. Pengguna buka `Ubah Password`.
2. Form: `password lama`, `password baru`, `konfirmasi password baru`.
3. Validasi: minimal 8 karakter, kombinasi huruf & angka; password baru ≠ password lama; konfirmasi cocok.
4. Submit → API `PUT /api/user/password` dengan body {old_password, new_password}.
5. Backend memverifikasi `old_password`. Jika valid → hash new_password (bcrypt/argon2) dan simpan.
6. Sukses → logout semua sesi lain (opsional) + notifikasi email (opsional).

## API Spec (Ringkas)
- GET /api/user/profile
  - Response: {id, username, email, avatar_url, profile: {age, skin_type, concerns, preferences}}
- PUT /api/user/profile
  - Body: partial profile fields
  - Auth: Bearer token
- PUT /api/user/profile/avatar
  - Body: multipart/form-data {avatar_file} OR {avatar_id}
  - Validasi: file type & size
- PUT /api/user/username
  - Body: {new_username, current_password}
  - Validasi: uniqueness + password check
- PUT /api/user/password
  - Body: {old_password, new_password}
  - Validasi: strength + old password

## Validasi & Error Handling
- Semua endpoint return JSON dengan format {success: bool, message: string, errors?: {field: message}}
- Kode HTTP: 200 (sukses), 400 (bad request/validation), 401 (unauthorized), 409 (conflict username), 413 (payload too large)
- Pesan error user-friendly, disertai hint per field.

## Keamanan
- Semua perubahan sensitif (username/password) memerlukan verifikasi password.
- Rate-limit endpoint perubahan credential untuk mencegah bruteforce.
- Upload avatar: scan file untuk malware (opsional), simpan di storage terpisah dengan akses terbatas.
- Audit log untuk perubahan username/password.

## Accessibility
- Label terikat ke input (aria-label), fokus keyboard, ukuran tombol cukup besar.
- Kontras warna teks vs background memenuhi WCAG AA.

## Acceptance Criteria
- Pengguna dapat melihat profil lengkap mereka.
- Pengguna dapat memilih avatar buah dari gallery dan melihat preview sebelum menyimpan.
- Pengguna dapat mengunggah foto profil dengan validasi tipe & ukuran.
- Pengguna bisa mengubah username setelah memasukkan password lama; jika username sudah ada, sistem menolak dengan pesan jelas.
- Pengguna bisa mengubah password dengan validasi dan mendapatkan konfirmasi.
- Semua aksi menampilkan feedback sukses/gagal dan tidak menyimpan data jika validasi gagal.


---

File ini dibuat untuk mengimplementasikan halaman Profile Glow Mate. Mau saya lanjutkan dengan: contoh payload API, mockup wireframe sederhana, atau implementasi frontend (komponen React/Vue)?
