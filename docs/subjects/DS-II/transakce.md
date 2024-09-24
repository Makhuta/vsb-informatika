---
title: Transakce
---

V následující tabulce vidíme ruzné vyjimky soubehu, které mohou i
nemohou nastat pro ruzné úrovni izolace transakcí:

| Uroven izolace        | Spinave cteni | Neopakovatelne cteni | Vyskyt fantomu |
| --------------------- | ------------- | -------------------- | -------------- |
| READ UNCOMMITTED (RU) | ✅            | ✅                   | ✅             |
| READ COMMITTED (RC)   | ❌            | ✅                   | ✅             |
| REPEATABLE READ (RR)  | ❌            | ❌                   | ✅             |
| SERIALIZABLE (SR)     | ❌            | ❌                   | ❌             |

- READ UNCOMMITTED - nejnizsi uroven izolace, ale **nejvyssi propustnost**
- SERIALIZABLE - nejvyssi uroven izolace, ale **nejnizsi propustnost**
