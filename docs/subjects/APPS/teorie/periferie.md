---
sidebar_position: 3
title: Komunikace s periferiemi
---

### Z jakých částí se skládá sběrnice a co je účelem jednotlivých částí?
- Sběrnice dělíme na Adresovou, Řídicí a Datovou
- Adresová
    - Přenáší adresy
    - Zdroj adresy je mikroprocesor
    - Počet bitů (vodičů) sběrnice odpovídá počtu bitů adresy
- Řídicí
    - Některé signály jsou generovány mikroprocesorem, některé jinými bloky
    - Nejčastější řídicí signály:
        - RESET
            - má každý mikroprocesor
            - uvede mikroprocesor do výchozího stavu
            - Aktivování uživatelem, nebo přídavným obvodem
        - MEMORY READ (MR)
            - zabezpečuje časování čtení z paměti (nebo jiných bloků) 
        - MEMORY WRITE (MW)
            - zabezpečuje časování zápisu do paměti (nebo jiných bloků)
        - INPUT / OUTPUT READ / WRITE
            - pro čtení nebo zápis do zařízení
        - READY
            - připravenost obvodu
- Datová
    - Slouží pro přenos veškerých dat v počítači (vždy mezi dvěma)
    - Nedůležitější parametry jsou šířka (počet bitů) a časování
    - Šířka ovlivňuje rychlost komunikace
    - Lze ušetřit vodiče pomocí multiplexování
    - V jednom okamžiku může být aktivní pouze jeden vysílač
    - Dělí se na:
        - Vnitřní sběrnice mikroprocesoru
        - Vnitřní sběrnice počítače
        - Vnější sběrnice počítače