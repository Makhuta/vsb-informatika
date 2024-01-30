---
sidebar_position: 6
title: Paměti
---

### Dle jakých kritérií či vlastností se dělí paměti počítačů? {#memory}
- Typu přístupu
    - [RAM](#memory "Random Access Memory") - libovolný přístup
    - [SAM](#memory "Serial Access Memory") - Seriový přístup
    - Speciální (paměť typu zásobník, fronta..)
- Možnosti zápisu/čtení
    - [RWM](#memory "Read Write Memory") - pro zápis a čtení
    - [ROM](#memory "Read Only Memory") - pouze pro čtení
    - Kombinované
        - [NVRAM](#memory "Non Volatile RAM")
        - [WOM](#memory "Write Only Memory")
        - [WORM](#memory "Write Once - Ready Many times memory") - optické disky
- Principu elementární buňky
    - [SRAM](#memory "Static RAM") - statické paměti
    - [DRAM](#memory "Dynamic RAM") - dynamické paměti
    - [PROM](#memory "Programable ROM"), [EPROM](#memory "Erasable PROM"), [EEPROM](#memory "Electrically Erasable PROM"), FLASH - programovatelné paměti
- Uchování informace po odpojení napájení
    - Non-Volatile - Zachovají si informaci i po odpojení napájení
    - Volatile - Ztráci informaci po odpojení napájení (DRAM a SRAM)



### Jak je v dynamických pamětech ukládána informace a jak je udržována?
- Ve formě náboje v kondenzátoru
- Zapomenou svá data cca po 10ms
- Proto je nutné obnovovat napětí kondenzárorů - Refresh 



### Jaká je vnitřní organizace dynamických pamětí?
- Ve čtvercové matici v jedné, nebo více vrstvách
- Výběr buňky tak musí být proveden pomocí row a column dekodéru
- DRAM čte adresu po dvou částech (adresa řádku a sloupce) do adresového bufferu
- [Organizace paměti, strana 4](https://poli.cs.vsb.cz/edu/apps/down/pameti.pdf#page=4)

Stavba DRAM buňky: 

![dram_bunka](../imgs/dram_bunka.png)



### Popište stručně historii vývoje dynamických pamětí.
- ??? :c



### Jak je ve statických pamětech ukládána informace a jak je udržována?
- Je uložená stavem klopného obvodu
- Lze realitovat pomocí 4 nebo 6 tranzistorů
- SRAM je dražší a pojme méně dat něž DRAM



### Jak je organizována vnitřně statická paměť?
- Jako 2D mřížka, kde jeden řádek tvoří jedno slovo
- SRAM paměti nevyužívají adresní multiplexing

![SRAM](../imgs/SRAM.png)



### Jaké typy pamětí si udržují svůj obsah i po odpojení napájení? {#memory-power-disconected}
- [(Nevolatilní)](#memory-power-disconected "Non-Volatile")
- [ROM](#memory-power-disconected "Read Only Memory")
    - Informace zapisuje výrobce (je složená z odporů, které výrobce přepálí.. neporušené prvky pak vedou proud a je v nich minimální napětí.. log. 0)
    - Doba pamatování není ohraničená
- [PROM](#memory-power-disconected "Programable ROM")
    - Informace se vypalijí pomocí "programátoru"
    - Lze zapsat jen jednou
- [EPROM](#memory-power-disconected "Erasable PROM")
    - Uchovává informaci díky kvalitně izolovaném el. napětí
    - K naprogramování je potřeba až 50ms trvající pulz o 5V
    - Lze vymazat pomocí UV záření
    - Doba pamatování 10 až 20 let
- [EEPROM](#memory-power-disconected "Electrically Erasable PROM")
    - Zápis stějně jak EPROM
    - Mazální pomocí el. pulzu s obrácenou polaritou
    - Doba pamatování 10 až 20 let
- FLASH
    - Lze programovat rychle přímo v počítači
    - Doba pamatování 10 až 100 let
    - Struktura buněk je podobná EEPROM, ale pro programování a mazání stači pulz 10us
    - Přes 10 000 programovacích a mazacích cyklů



### Paměti s trvalým obsahem umožňují svůj obsah přepsat. Jak se přepis u jednotlivých typů provádí?
- EPROM - UV zářením
- EEPROM - Elektricky, až 50ms pulzem o 5V
- FLASH - Elektricky 10us pulzem



### Jaké speciální typy pamětí se používají? {#memory-types}
- [VRAM](#memory-types "Video RAM")
    - Dvouportová
    - Zvýšené přenosové pásmo
- [WRAM](#memory-types "Window RAM (nemá nic společného s Windows operačním systémem)")
    - O 25% větší přenosové pásmo než VRAM
    - Nabízí double-buffering
- [SGRAM](#memory-types "Synchroní Grafická RAM")
    - Funguje jako [SDRAM](#memory-types "Synchronous Dynamic RAM")
    - Ale [SDRAM](#memory-types "Synchronous Dynamic RAM") je optimalizována pro kapacitu a [SGRAM](#memory-types "Synchronous Graphic RAM") pro přenos dat
- [FIFO](#memory-types "First In First Out") paměti (fronta)
    - Bez přesouvání obsahu
    - S přesouváním obsahu
- Cache paměti
    - Malé a rychlé
    - Rychlé komponenty čtou data z cache a nemusí čekat na komponentu pomalejší
    - L1,L2,..



### Hierarchie pamětí v počítači

![memory_h](../imgs/memory_h.png)



### Jak se u pamětí detekují a opravují chyby? {#error-fixing}
- SRAM je spolehlivější než DRAM
- Tvrdé chyby - opakující se 
- Měkké chyby - Neopkající se .. těžší rozpoznat
- Kontrola Parity
    - dorovnává se na lichý počet jedniček do 9. bitu
    - neopravuje, jen detekuje chybu (když je počet jedniček sudý)
- [ECC](#error-fixing "Error Correction Code")
    - Detekuje více bitové chyby
    - Schopen opravit 1 bitovou chybu
    - Nutnost "Wait State" => zpomalení 2-3%
