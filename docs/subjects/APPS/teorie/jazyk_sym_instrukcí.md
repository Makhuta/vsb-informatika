---
sidebar_position: 2
title: Jazyk symbolických instrukcí
---

### Registry procesoru
- 64bit: RAX, RBX, RCX, RDX, RSI, RDI, RBP, RSP, R8 - R15
- 32bit: začínají E, R8D - R15D	(Zápis vyresetuje horní část Rxx !)
- 16bit: AX, BX ... , R8W - R15W
- 8bit: AH (high), AL (low), BH, BL .. (Jen ABCD, jsou rozděleny na high a low)
- RSP - stack pointer
- RIP - instruction pointer



### Adresování, spojování JSI a C.
- Adresování:
    - [Bázový + Indexový * měřítko + Konstanta]
    - Např: mov rax, qword [ rdi + rbx * 8 ] 
- Datové typy:
    - BYTE $\Rarr$ 8 bit
    - WORD $\Rarr$ 16 bit
    - DWORD $\Rarr$ 32 bit 
    - QWORD $\Rarr$ 64 bit
- Spojování:
    - JSI: píšeme “global” před funkce a proměnné z C



### Základní instrukce přesunu, bitové, logické, aritmetické.
- Přesunu:
    - mov, movzx, movsx (rozšíří i se znaménkem)
    - CMOVcc - podmíněný přesun (cc je podmínka.. např CMOVZ )
    - mov KAM, CO (mov CÍL, ZDROJ)
    - nelze přesouvat z paměti do paměti (musí to jít přes registr)

- Logické:
    - AND cíl, zdroj
    - TEST - stejně jako AND, ale neuloží výsledek
    - OR, XOR, NOT
- Bitové:
    - SHL, SHR (bitový posun)
    - BOR, BOL (bitová rotace)
- Aritmetické:
    - ADD, SUB, NEG, INC, DEC
    - CMP - stejně jako SUB, ale neuloží výsledek
    - MUL, IMUL, DIV, IDIV (I_ je pro znaménková čísla)


### Skokové instrukce nepodmíněné a podmíněné. Volání funkcí s parametry, návratovými hodnotami
- Skokové:
    - CALL - pro volání funkcí
    - JMP
    - Jcc:
        - pro testování bitů: JZ, JNE, JNZ...
        - pro porovnávání čísel: 
            1. Bezznaménkových:
                - A - above
                - B - below
            2. Znaménkových:
                - L - less
                - G - greater
- Návratová hodnota v RAX ( EAX, AX, AL)
- Parametry jsou v pořadí v RDI, RSI, RDX, RCX, R8, R9