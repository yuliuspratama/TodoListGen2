# Security Guidelines

## ⚠️ Informasi Sensitif

File dan informasi berikut **TIDAK BOLEH** di-commit ke repository:

### ❌ JANGAN Commit:

1. **`.env.local`** - Berisi credentials Supabase
2. **`.env`** - Environment variables
3. **Credentials hardcoded di kode** - API keys, tokens, dll
4. **File dengan informasi sensitif** - API keys, database passwords, dll

### ✅ BOLEH Commit:

1. **`.env.example`** - Template file tanpa credentials
2. **File konfigurasi** - `package.json`, `tsconfig.json`, dll
3. **Source code** - File `.ts`, `.tsx`, `.js`, `.jsx`
4. **Dokumentasi** - Tanpa credentials spesifik

## 🔒 Protection

File-file sensitif sudah di-ignore oleh `.gitignore`:

```
.env*.local
.env
```

## 📝 Checklist Sebelum Commit

- [ ] Pastikan `.env.local` TIDAK ada di staging area
- [ ] Pastikan tidak ada credentials hardcoded di kode
- [ ] Pastikan tidak ada API keys di dokumentasi
- [ ] Verifikasi dengan: `git status` sebelum commit

## 🛠️ Jika Credentials Terlanjur Ter-Commit

Jika credentials sudah ter-commit ke repository:

1. **Segera rotate/regenerate credentials** di Supabase Dashboard
2. **Hapus dari git history** (gunakan `git filter-branch` atau BFG Repo-Cleaner)
3. **Update `.env.local`** dengan credentials baru

## 🔐 Best Practices

1. **Selalu gunakan environment variables** untuk credentials
2. **Gunakan `.env.example`** sebagai template (tanpa credentials)
3. **Jangan hardcode credentials** di source code
4. **Gunakan Supabase Row Level Security (RLS)** untuk proteksi database
5. **Review kode sebelum commit** untuk memastikan tidak ada credentials

## 📚 References

- [Supabase Security](https://supabase.com/docs/guides/platform/security)
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- [OWASP Security Guidelines](https://owasp.org/)

