---
sidebar_position: 2
title: Otázky
---

## 1. Co je složený index? Kdy jej používáme? Výhody, nevýhody a uveď příklad. + Kdy nevhodné p.
Složený index na dvou (a více?) klíčích tabulky. Rychlejší, optimalizované dotazy. Efektivní vyhledávání, třídění.
Avšak změny dat vyžadují i aktualizaci indexů, taky zabírají msto na disku. Např. first a last name employees

---

### a) Špatná selektivita sloupců:
Pokud sloupce, na kterých je vytvořen složený index, mají nízkou selektivitu (malý počet unikátních hodnot), index může být méně účinný a může způsobit zbytečné zvětšení velikosti indexu a zpomalení operací.

### b) Časté aktualizace:
Pokud jsou sloupce v indexu často aktualizovány, může to vést k fragmentaci indexu a snížení výkonu operací čtení a zápisu. Složené indexy jsou citlivější na aktualizace než jednoduché indexy.

### c) Nadbytečnost:
V některých případech může být složený index nadbytečný, pokud není použit pro optimalizaci dotazů. Pokud dotazy neprovádějí filtrování nebo třídění na základě všech sloupců v indexu, může být složený index zbytečný a zbytečně zvětšovat velikost databáze.

### d) Složitost správy:
Přidání složených indexů může zvýšit složitost správy databáze a může zpomalit operace zápisu a aktualizace dat. Složené indexy vyžadují sledování a správu vícero sloupců, což může být náročné.

### e) Omezení paměti a výkonu:
V případech, kdy je k dispozici omezené množství paměti nebo kdy jsou výkonnostní požadavky vysoké, může použití složeného indexu zpomalit databázové operace a snížit efektivitu využití paměti.

!!!Problém: Při indexu login,jmeno a dotazu na jméno, bude docházet k sekvenčnímu průchodu!



## 2. Popiš objektivně-relační datový model. 5 rysů oproti relačnimu modelu a příklady těch rysů.
### a) Podpora uživatelských datových typů
Vlastní datové typy - rozšíření oproti tradičním předdefinovaným typům v relačním modelu. Místo použití primitivních datových typů jako INTEGER nebo VARCHAR, můžete vytvořit vlastní typ ADDRESS, který bude obsahovat složky jako street, city, a zipcode.

### b) Podpora objektových tříd a dědičnosti
Koncepty tříd a dědičnosti - umožňuje hierarchické struktury dat. Třída Vehicle a od ní odvodit třídy Car a Truck, které budou dědit vlastnosti Vehicle, ale mohou mít také své specifické vlastnosti.

### c) Metody a funkce spojené s datovými typy
Umožňuje definovat metody a funkce, které jsou spojené s uživatelskými datovými typy. Pro typ ADDRESS můžete definovat metodu full_address(), která vrátí kompletní adresu jako řetězec.

### d) Podpora složených datových struktur
Pole, seznamy nebo mapy, přímo v rámci datových typů. Můžete mít sloupec typu INTEGER ARRAY, který bude obsahovat pole čísel, nebo sloupec typu MAP\<STRING, STRING\>, který bude obsahovat mapu klíč-hodnota.

### e) Referenční integrita a podpora odkazů
Podobně jako relační model, i objektivně-relační model podporuje referenční integritu, ale navíc umožňuje práci s odkazy (pointers nebo references) na objekty. Můžete mít sloupec typu REFERENCE TO Vehicle,
který bude odkazovat na instanci třídy Vehicle, což umožní snadnější správu vztahů mezi objekty.



## 3. Minispecifikace
GetPumpLocation(id_pump, p_name):
- Spustí transakci:
start transaction
  - Zkontroluje, zda p_name je, či není NULL a informuje usera skrze konzoli + ukázka erroru:
```sql
IF p_name IS NOT NULL THEN
    DBMS_OUTPUT.PUT_LINE('No problems here.');
ELSE
p_name := 'UNDEFINED';
RAISE_APPLICATION_ERROR(-20001, 'There is something wrong with the Consumable field!');
END IF;
```


- Přiřadí pumpu ke kroku + přiřadí lokaci (do OUT proměnné):
```sql
UPDATE Grinding_Polishing
SET id_used_pump = id_pump;

SELECT location
INTO f_location
FROM Pumps
WHERE id_pump = your_id_pump;

out_location := f_location;
```
Změní hodnotu „filled“ pumpy (zde 1, ekvivalent k bool. „True“):
```sql
UPDATE Pumps
SET filled = 1
WHERE Pumps.id_pump = id_pump;
- Ukončí transakci:
commit;
return 1;
```

## 4. K čemu slouží v databázových systémech log soubor? Proč je efektivnější zápis do logu než do databáze?
### a) Obnova databáze po selhání:
V případě havárie systému nebo výpadku napájení může být databáze obnovena pomocí log souborů. Log obsahuje záznamy o všech transakcích, které byly provedeny, a může být použit k obnově databáze do  konzistentního stavu.

### b) Transakční zpracování:
Log soubory umožňují implementaci transakčního zpracování, které zajišťuje vlastnosti ACID (Atomicity, Consistency, Isolation, Durability). Pokud transakce selže, lze pomocí logu provést rollback změn.

### c) Replikace:
V prostředích s replikovanými databázemi jsou log soubory používány k synchronizaci změn mezi primární a sekundární databází.

### d) Auditing a sledování:
Log soubory mohou být použity pro auditní účely a sledování změn provedených na databázi, což je důležité pro bezpečnost a dodržování předpisů.

---

### a) Sekvenční zápis vs. náhodný zápis:
Log soubory jsou obvykle zapisovány sekvenčně, což je rychlejší než náhodné zápisy do databázových tabulek.

Sekvenční zápis je efektivnější pro disky, protože minimalizuje pohyby diskových hlav.
### b) Minimalizace I/O operací:
Zápis do logu je typicky méně náročný na I/O operace ve srovnání s přímým zápisem do databázových tabulek. Logování umožňuje seskupit změny a provést je najednou, což snižuje celkový počet I/O operací.

### c) Asynchronní zápis:
Po zapsání změn do logu může databázový systém provádět zápisy do hlavních databázových tabulek asynchronně. To znamená, že systém může pokračovat ve zpracovávání dalších operací, zatímco změny jsou aplikovány na tabulky na pozadí.

### d) Zajištění trvanlivosti (Durability):
Zapsání změn do logu zajišťuje, že změny přežijí havárii systému. Jakmile je změna zapsána do logu, může být později aplikována na databázi, což zajišťuje trvanlivost transakcí.

### e) Snazší implementace rollbacku:
Pokud dojde k selhání transakce, log umožňuje snadné provedení rollbacku změn. Systém jednoduše "odroluje" změny zaznamenané v logu, aniž by musel přistupovat k hlavní databázi.



## 5. Popiš proběh souběhu zvaný výskyt fantomů, uveď příklad.
Problém, když běží dvě transakce v jednu chvíli, navzájem se ovlivní. Transakce A přečte počet řádků, transakce B provede insert nebo delete a transakce A následně přečte jiný počet řádků, jak předtím.

- A:
```sql
SET TRANSACTION ISOLATION LEVEL READ COMMITTED; <br/>
SELECT COUNT(*) FROM employees WHERE department_id = 10;
```

---

- B:
```sql
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

INSERT INTO employees (employee_id, first_name, last_name, department_id, hire_date)
VALUES (4, 'Bob', 'Green', 10, DATE '2021-07-30');

COMMIT;
```



## 6. Uveď asymptotické časové složitosti pro tabulku typu halda a index typu B-strom pro operace: vložení záznamu, smazání záznamu a bodový a rozsahový dotaz.
| Operace | Halda (Heap) | B-strom (B-tree) |
|-|-|-|
| Vložení | O(log n) | O(log n) |
| Smazání | O(log n) | O(log n) |
| Bodový dotaz | O(n) | O(log n) |
| Rozsahový dotaz | O(n) | O(log n + k) |



## 7. Jaký význam mají parametrizované dotazy v JBDC nebo ADO.NET? Proč je používáme?
### a) Ochrana před SQL injection
Parametrizované dotazy výrazně snižují riziko SQL injection útoků tím, že oddělují SQL kód od uživatelských vstupů.

### b) Zvýšení výkonu
Parametrizované dotazy umožňují databázovým systémům znovu použít plány vykonání dotazů, což zvyšuje výkon aplikací.

### c) Zlepšení čitelnosti a údržby kódu
Parametrizované dotazy vedou k čistšímu, lépe čitelnému a snadněji udržovatelnému kódu, protože logika dotazů je oddělena od dat.



## 8. Jaké příkazy musíme v PL/SQL spouštět pomocí dynamického SQL? Popiš rozdíl mezi statickým a dynamickým PL/SQL.
Když potřebujeme vykonat SQL příkaz, který se nezná dopředu a je generován za běhu programu,
tedy:
a) DDL příkazy (Data Definition Language) - CREATE, ALTER, DROP
b) DML příkazy (Data Manipulation Language) s neznámými strukturami - INSERT, UPDATE, DELETE,
SELECT s dynamic. generov. částmi, jako třeba názvy tabulek či sloupců,
c) Příkazy, kde jsou neznámé parametry nebo podmínky - dynamické WHERE, ORDER BY, JOIN podm.
atd.

---

- a) Statické PL/SQL příkazy jsou příkazy, které jsou pevně definované v kódu a jsou známy v
době kompilace. Tyto příkazy jsou pevně zakódované a nemění se během běhu programu.
LEPŠÍ VÝKON, KOMPILOVÁNY A OPTIMALIZOVÁNY V DOBĚ KOMP. SQL BLOKU, MENŠÍ RIZIKO SQL INJ BO
PEVNĚ DEFINOVANÉ, JEDNODUCHÉ A DOBRÉ NA ÚDRŽBU + PŘEDVÍDATELNÉ
b) Dynamické PL/SQL příkazy jsou generovány a vykonávány za běhu programu. Používají se,
když je struktura SQL příkazu známá až v době vykonání
FLEXIBILNÍ, NÍŽŠÍ VÝKON A POTŘEBA ESCAPOVÁNÍ PRO ZABEZPEČENÍ



## 9. Popiš význam jednotlivých vlastností ACID / K čemu používáme vícenásobné operace?
**ATOMITA** - Transakce je "vše nebo nic". Buď se provede celá transakce, nebo žádná její část.
**KONZISTENCE** - Transakce zachovává konzistentní stav databáze. Dodržuje všechny definované pravidla a omezení - či klíče a triggery.
**IZOLACE** - Transakce probíhají izolovaně od sebe, takže paralelní transakce se navzájem neovlivňují. (SERIALIZABLE v commandu)
**TRVANLIVOST** (DURABILITY) - Po potvrzení transakce jsou změny trvalé a nesmazatelné, i při selhání systému.



## 10. Popiš operace UNDO a REDO vykonávané při zotavení a uveď i typy transakcí, které jsou těmito operacemi zpracovávany.
a) Význam: Operace UNDO se používá k vrácení zpět změn, které byly provedeny transakcemi,
které nebyly potvrzeny (committed) v okamžiku selhání. Cílem je vrátit databázi do stavu
před začátkem těchto neúspěšných transakcí.

Postup:
Identifikace neúspěšných transakcí: Najdou se všechny transakce, které byly aktivní v
okamžiku selhání a nebyly potvrzeny.
Vrácení změn: Pro každou neúspěšnou transakci se provedou operace UNDO, které vrátí
všechny změny provedené touto transakcí. To znamená, že se použijí záznamy v UNDO logu k
navrácení původních hodnot.

Typy transakcí:
Neúspěšné transakce: Transakce, které nebyly potvrzeny před selháním.

---

b) Význam: Operace REDO se používá k opětovnému provedení změn, které byly potvrzeny
před selháním, ale možná ještě nebyly trvale zapsány do databáze. Cílem je zajistit, 
aby všechny potvrzené změny byly trvale uloženy.

Postup:
Identifikace potvrzených transakcí: Najdou se všechny transakce, které byly potvrzeny
před selháním.
Opětovné provedení změn: Pro každou potvrzenou transakci se provedou operace REDO,
které znovu provedou všechny změny provedené touto transakcí. To znamená, že se použijí
záznamy v REDO logu k opětovnému provedení těchto změn.

Typy transakcí:
Potvrzené transakce: Transakce, které byly potvrzeny před selháním.



## 11. Popište operace vkládání a vyhledávání v tabulce typu halda a jejich čas. složitosti.
| Operace | Popis | Časová složitost |
| - | - | - |
| Vložení | Přidání prvku na konec a propagování nahoru | O(log n) |
| Vyhledávání | Prohledávání všech prvků | O(n) |

---

### a) Přidání prvku na konec haldy:
Nový prvek se přidá na konec haldy (do poslední pozice pole, které reprezentuje haldu).
Tím se zachová kompletní struktura binárního stromu.

### b) Propagování nahoru (Bubble Up):
Porovnáme nově přidaný prvek s jeho rodičem.
Pokud porušuje vlastnost haldy (například v max-heap je menší než jeho rodič), zaměníme
ho s rodičem.
Tento krok opakujeme, dokud se nově přidaný prvek nedostane na správné místo nebo se
dostane na vrchol haldy.

### c) Prohledávání celé haldy:
V nejhorším případě je nutné prohledat všechny prvky haldy, protože halda není
strukturována pro efektivní vyhledávání.



## 12. Rozdíl mezi odloženou a okamžitou aktualizací? +  co se kde zapisuje a jaký algoritmus využívá? (redo, no-undo) + okamžitá - co se kam ukládá a algoritmus
### a) Odložená aktualizace (Deferred Update)
Princip: Při odložené aktualizaci jsou změny v paměti změněných datových objektů (např. záznamů) uloženy dočasně a aplikovány na databázi až po potvrzení transakce.
#### Zpravidla se používá u:
V tradičních databázových systémech, které implementují uzamykání na úrovni řádků.
##### Výhody:
	Vyšší výkon: Umožňuje vyhnout se zbytečným zámkům a aktualizacím při čtení dat.
	Méně konfliktů: Méně pravděpodobné, že dojde ke konfliktu zámků (lock contention).
##### Nevýhody:
	Menší konzistence: Data mohou být dočasně v nestabilním stavu mezi aktualizací a
		potvrzením transakce.
	Větší nároky na paměť: Vyžaduje udržování změn v paměti až do potvrzení transakce.

### b) Okamžitá aktualizace (Immediate Update)
Princip: Při okamžité aktualizaci jsou změny aplikovány na databázi ihned po provedení samotné operace.
#### Zpravidla se používá u:
V moderních databázových systémech, které implementují MVCC (Multi-Version Concurrency Control) nebo jiné mechanismy izolace transakcí.
##### Výhody:
	Vyšší konzistence: Data jsou okamžitě viditelná pro ostatní transakce po provedení 		změn.
	Menší paměťové nároky: Nepotřebuje udržovat dočasné změny v paměti.
##### Nevýhody:
	Větší konflikty zámků: Může docházet k častějším konfliktům zámků, protože změny jsou aplikovány okamžitě.
	Nižší výkon v některých případech: Může být potřeba čekat na uvolnění zámku při provedení operace čtení.

---

a) Redo algoritmus:
Provedené změny jsou nejprve zapsány do redo logu a aplikovány na databázi až po potvrzení transakce.
Umožňuje obnovit databázi do stavu před provedením transakce v případě výpadku systému.
b) No-Undo algoritmus:
Provedené změny jsou ihned aplikovány na databázi a zároveň zaznamenány do No-Undo logu.
Umožňuje obnovit databázi do stavu před provedením transakce v případě výpadku systému, ale neuchovává informace o původním stavu dat.

---

Co a kam se ukládá: Aktualizace se ukládá přímo do konkrétních položek v databázi,
kde jsou data uložena. To znamená, že změny jsou okamžitě propagovány do databáze,
což umožňuje, aby byly viditelné pro ostatní transakce.
V tomto případě se provádí operace REDO. Jelikož změny jsou okamžitě zapsány do
databáze, při obnově databáze po selhání nebo havárii není třeba provádět UNDO
operace, protože žádné nekonzistentní změny nejsou přítomny.



## 13. ORM - minimalizace počtů dotazů na databázi a k čemu je to dobré? + Když máš cizí klíč odkazující na jinou tabulku + základní rysy ORM + 1:1 A 1:N vazby implementace ORM (Object-Relational Mapping) je technika, která mapuje objektový model aplikace na relační model databáze.

### a) Zlepšení výkonu:
Každý dotaz na databázi představuje režii komunikace mezi aplikací a databází, což může mít negativní dopad na výkon aplikace. Minimalizace počtu dotazů snižuje tuto režii a zlepšuje výkon aplikace.

### b) Snížení zátěže na databázi:
Příliš mnoho dotazů na databázi může způsobit nadměrnou zátěž na server databáze, což může vést k přetížení a snížení výkonu celého systému. Minimalizace počtu dotazů snižuje tuto zátěž a zlepšuje škálovatelnost systému.

### c) Snížení režie sítě:
Každý dotaz na databázi musí cestovat přes síť mezi aplikací a serverem databáze. Příliš mnoho dotazů může způsobit přetížení sítě a zvýšenou režii komunikace. Minimalizace počtu dotazů snižuje tuto režii a zlepšuje výkonnost aplikace.

### d) Zvýšení přehlednosti kódu:
Pokud aplikace provádí mnoho jednotlivých dotazů na databázi, může to vést k nepřehlednému a obtížně udržovatelnému kódu. Minimalizace počtu dotazů umožňuje psát čistší a lépe udržovatelný kód.

- Měli bychom využít znalosti konkrétní databáze a navrhnout ORM tak, abychom stahovali data s co nejmenším počtem dotazů (je např. lepší použít jeden SELECT dotaz, který vrátí milion výsledků, než 1000 SELECT dotazů, kde každý vrátí 1000 výsledků).
- Místo více dotazů tedy můžeme použít spojování tabulek. Měli bychom taky stahovat pouze ta data, které potřebujeme
- Pokud navrhujeme funkci, která generuje velký počet mezivýsledků, měla by být naimplementovaná na straně databáze (jako uložená procedura/funkce), aby se mezivýsledky nemusely zbytečně přenášet přes síť

---

V ORM můžete minimalizovat počet dotazů pomocí tzv. eager loadingu nebo lazy loadingu.
#### a) Eager loading:
Při eager loadingu jsou data načtena v předstihu, tedy společně s hlavní entitou jsou načteny také související entity. To umožňuje minimalizovat počet dotazů, protože všechny potřebné data jsou načteny najednou.

#### b) Lazy loading:
Lazy loading načítá data až v okamžiku, kdy jsou potřeba. To znamená, že pokud máte cizí klíč, který odkazuje na jinou tabulku, data z této tabulky nebudou načtena, dokud nebudou potřeba. Tím se minimalizuje počet dotazů na databázi.

---

#### a) Mapování objektů na tabulky:
ORM umožňuje mapovat objekty z objektově orientovaného programování (například třídy v Javě nebo C#) na tabulky v relační databázi.

#### b) Zajištění konzistence dat:
ORM poskytuje mechanismy pro udržování konzistence dat mezi objekty v programu a odpovídajícími záznamy v databázi. To zahrnuje synchronizaci změn provedených v objektech s databází a naopak.

#### c) Abstrakce databázového přístupu:
ORM poskytuje abstrakci nad databázovým přístupem, což umožňuje programátorům pracovat s objekty a doménovou logikou namísto psaní SQL dotazů a manipulace s databázovými záznamy.

#### d) Podpora vztahů mezi objekty:
ORM umožňuje mapovat vztahy mezi objekty (například asociace, kompozice, dědičnost) na odpovídající vztahy mezi tabulkami v databázi.

#### e) Automatické generování SQL:
ORM frameworky často automaticky generují SQL dotazy na základě definice objektů a jejich vztahů, což usnadňuje práci s databází a snižuje potřebu psaní ručních dotazů.

#### f) Transparentní zpracování dat:
ORM umožňuje transparentní zpracování dat bez nutnosti znalosti detailů databázového modelu. To umožňuje programátorům soustředit se na implementaci obchodní logiky aplikace.

#### g) Podpora pro dědičnost a polymorfismus:
Některé ORM frameworky poskytují podporu pro dědičnost a polymorfismus, což umožňuje efektivní práci s objekty různých typů a hierarchií dědičnosti.

#### h) Optimalizace výkonu:
Některé ORM frameworky poskytují mechanismy pro optimalizaci výkonu, jako je lazy loading, eager loading nebo caching, které pomáhají minimalizovat počet dotazů na databázi a zlepšují výkon aplikace.

---

#### a) V případě vazby 1:1 má jeden objekt vazbu na právě jeden jiný objekt. Například, každý uživatel má přidělený jeden profil.
```java
@Entity
public class User {
    @Id
    private Long id;

    private String username;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private UserProfile profile;

    // Getters and setters
}

@Entity
public class UserProfile {
    @Id
    private Long id;

    private String fullName;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Getters and setters
}
```

b) Objekt má vazbu na více jiných objektů.
```java
public class Parent
{
    public int Id { get; set; }
    public string Name { get; set; }
    public ICollection<Child> Children { get; set; }
}

public class Child
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int ParentId { get; set; }
    public Parent Parent { get; set; }
}
```


## 14. Rozdíly mezi shlukováním a indexy?
### Shlukování (Clustering):
#### a) Organizace dat:
Při shlukování jsou řádky tabulky fyzicky uspořádány podle určitého	sloupce (shlukovacího klíče), což znamená, že řádky se stejnou nebo podobnou hodnotou shlukovacího klíče jsou uloženy blízko sebe na disku.
#### b) Optimalizace čtení:
Shlukování usnadňuje rychlé čtení dat, protože řádky se stejným shlukovacím klíčem jsou uloženy v blízkosti sebe na disku, což umožňuje efektivnější přístup k těmto řádkům pomocí operací jako je scan nebo seek.
#### c) Jeden shlukovací klíč:
V tabulce může být pouze jedno shlukování, protože řádky jsou uspořádány podle jednoho shlukovacího klíče.
#### d) Neumožňuje vyhledávání na jiných sloupcích:
Shlukování uspořádává řádky pouze podle jednoho sloupce, což znamená, že není vhodné pro vyhledávání na jiných sloupcích, pokud nejsou součástí shlukovacího klíče.

---

### Indexy:
#### a) Organizace dat:
Indexy vytvářejí dodatečnou strukturu dat, která obsahuje odkazy na řádky v tabulce, seřazené podle hodnoty indexovaného sloupce.
#### b) Optimalizace čtení a vyhledávání:
Indexy umožňují rychlé čtení a vyhledávání dat na základě hodnoty indexovaného sloupce, což zlepšuje výkon dotazů, které vyhledávají data pomocí tohoto sloupce.
#### c) Možnost vytvoření více indexů:
V jedné tabulce může být vytvořeno více indexů na různé sloupce, což umožňuje optimalizovat dotazy na základě různých filtrů a podmínek.
#### d) Podpora pro vyhledávání na různých sloupcích:
Indexy umožňují vyhledávat data na základě hodnot různých sloupců, což znamená, že jsou vhodné pro různé typy dotazů.



## 15. Co je commit point?
Je bod v databázové transakci, na kterém jsou všechny změny provedené v rámci této transakce trvale potvrzeny a zapsány do databáze. Po potvrzení transakce jsou tyto změny viditelné pro ostatní transakce a stávají se trvalými. Commit point je tedy důležitým bodem v životním cyklu transakce, který určuje, kdy jsou změny transakce aplikovány.



## 16. Co je kurzor? + dva příklady implementace
Kurzor je ukazatel nebo ovládací struktura, která umožňuje aplikaci iterovat přes
výsledek dotazu provedeného na databázi. Kurzor je obvykle používán v jazyce SQL k
manipulaci s výsledky dotazů, přičemž umožňuje postupný přístup k jednotlivým řádkům
výsledné sady dat.

```
---
DECLARE
    -- Deklarace kurzoru pro výběr všech zaměstnanců
    CURSOR employees_cursor IS
        SELECT employee_id, first_name, last_name FROM employees;

    -- Deklarace kurzoru pro výběr všech oddělení
    CURSOR departments_cursor IS
        SELECT department_id, department_name FROM departments;
BEGIN
    -- Otevření kurzoru pro výběr zaměstnanců
    OPEN employees_cursor;
    
    -- Zpracování výsledků kurzoru pro výběr zaměstnanců
    FOR employee_rec IN employees_cursor LOOP
        DBMS_OUTPUT.PUT_LINE('Employee ID: ' || employee_rec.employee_id || ', Name: ' || employee_rec.first_name || ' ' || employee_rec.last_name);
    END LOOP;

    -- Zavření kurzoru pro výběr zaměstnanců
    CLOSE employees_cursor;

    -- Otevření kurzoru pro výběr oddělení
    OPEN departments_cursor;
    
    -- Zpracování výsledků kurzoru pro výběr oddělení
    FOR department_rec IN departments_cursor LOOP
        DBMS_OUTPUT.PUT_LINE('Department ID: ' || department_rec.department_id || ', Name: ' || department_rec.department_name);
    END LOOP;

    -- Zavření kurzoru pro výběr oddělení
    CLOSE departments_cursor;
END;
```

## 17. Parametrizované dotazy v C sharp a Javě + k čemu je používáme?
Parametrizované dotazy jsou dotazy do databáze, ve kterých jsou parametry předány
odděleně od samotného SQL dotazu. Tyto parametry jsou pak nahrazeny skutečnými
hodnotami při provádění dotazu. Používání parametrizovaných dotazů je doporučováno z
důvodů bezpečnosti, výkonu a přehlednosti kódu.

---
```java
using System.Data.SqlClient;

class Program
{
    static void Main(string[] args)
    {
        string connectionString = "Data Source=myServerAddress;Initial Catalog=myDatabase;User ID=myUsername;Password=myPassword;";
        string sqlQuery = "SELECT * FROM Employees WHERE DepartmentID = @DepartmentID";

        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            SqlCommand command = new SqlCommand(sqlQuery, connection);
            command.Parameters.AddWithValue("@DepartmentID", 123);

            connection.Open();
            SqlDataReader reader = command.ExecuteReader();

            while (reader.Read())
            {
                Console.WriteLine(reader["FirstName"] + " " + reader["LastName"]);
            }
        }
    }
}
```
---
V Javě můžete použít parametrizované dotazy s JDBC (Java Database Connectivity)!!
```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Main {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/mydatabase";
        String username = "root";
        String password = "password";
        String sqlQuery = "SELECT * FROM Employees WHERE DepartmentID = ?";

        try (Connection connection = DriverManager.getConnection(url, username, password);
             PreparedStatement statement = connection.prepareStatement(sqlQuery)) {

            statement.setInt(1, 123);
            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()) {
                System.out.println(resultSet.getString("FirstName") + " " + resultSet.getString("LastName"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```


## 18. Popiš řešení souběhu pomocí zamykání a ztráty aktualizace?
### Základní principy:
#### a) Zamykání (Locking):
Při použití tohoto přístupu jsou zámky použity k uzamčení přístupu k datům během provádění transakce. Existují různé úrovně zámků, jako je například zámek na úrovni řádku (row-level lock) nebo zámek na úrovni tabulky (table-level lock).

#### b) Řízení souběhu (Concurrency Control):
Databázový systém řídí souběžný přístup k datům tak, aby nedocházelo ke konfliktům zámků a aby byla zachována konzistence dat.

#### c) Ztráta aktualizace (Lost Update):
Tento termín se používá k popisu situace, kdy dvě nebo více transakcí čtou data ze stejného zdroje, provedou změny a poté zápis změn do databáze, čímž přepíšou změny provedené ostatními transakcemi.

---

### Řešení souběhu pomocí zamykání a ztráty aktualizace:
#### a) Získání zámku před aktualizací:
Před prováděním aktualizace dat transakce nejprve získá zámek na daný zdroj dat. Pokud zámek není k dispozici (je již uzamčen jinou transakcí), transakce musí čekat, dokud zámek není uvolněn.

#### b) Aplikace změn s použitím zámku:
Jakmile transakce získá zámek, může provést aktualizaci dat. Během této fáze jsou data uzamčena a chráněna před změnami ostatními transakcemi.

#### c) Uvolnění zámku po dokončení transakce:
Po dokončení aktualizace transakce uvolní zámek, čímž umožní jiným transakcím přistupovat k daným datům a provádět nad nimi změny.



## 19. K čemu slouží NESLOŽENÝ index + výhody a nevýhody
Nesložený index je index vytvořený na jednom sloupci v databázi. Jeho hlavním cílem je zrychlit vyhledávání a třídění dat v tabulce na základě hodnot tohoto jednoho sloupce. Zde jsou výhody a nevýhody nesložených indexů:

### Výhody nesložených indexů:
#### a) Zrychlení vyhledávání:
Index umožňuje databázovému systému rychle lokalizovat požadovaná data na základě hodnoty sloupce, na kterém je index vytvořen.
#### b) Zrychlení třídění:
Pokud je dotaz řazen nebo seskupován podle sloupce, na kterém je vytvořen nesložený index, index umožňuje databázovému systému efektivně třídit data. c) Snížení nákladů na vyhledávání: Použití nesložených indexů může snížit náklady na vyhledávání dat v databázi a zlepšit celkový výkon operací.

---
### Nevýhody nesložených indexů:
#### a) Omezená pokrytí dotazu:
Nesložený index je užitečný pouze pro dotazy, které se týkají sloupce, na kterém je index vytvořen. Pro dotazy, které se týkají jiných sloupců, může být index neefektivní.
#### b) Zvětšení velikosti databáze:
Každý index zvyšuje velikost databáze, což může zpomalit operace zápisu a zvýšit nároky na paměť. Proto je důležité pečlivě zvážit, které sloupce indexovat, aby nedošlo k nadměrnému nárůstu velikosti databáze.
#### c) Aktualizace indexu:
Při aktualizaci dat v tabulce musí být aktualizován i nesložený index, což může zpomalit operace zápisu a zvýšit nároky na výpočetní výkon.
#### d) Zvýšená složitost správy:
Přidání nesložených indexů zvyšuje složitost správy databáze a může vyžadovat další úsilí při správě indexů a jejich údržbě.



## 20. Dopředný zápis v logu
Dopředný zápis v logu (Forward Logging) je způsob, jakým jsou změny zaznamenávány v transakčním logu. Při použití dopředného zápisu jsou změny zaznamenávány do logu až poté, co jsou změny aplikovány na databázi. Tento přístup zajišťuje, že veškeré změny jsou trvale zaznamenány pouze tehdy, když jsou úspěšně provedeny, a minimalizuje riziko ztráty dat v případě výpadku systému nebo havárie.

## 21. Doménový model a DAO v ORM
### a) Doménový model:
Doménový model je reprezentace struktury a chování oblasti problému v rámci softwarového systému. To může zahrnovat třídy a objekty, které představují entity a operace na těchto entitách.
### b) DAO (Data Access Object):
DAO je návrhový vzor, který odděluje přístup k datům od klientského kódu. V kontextu ORM slouží DAO k abstrakci přístupu k datům uloženým v databázi. Většinou se používá pro vytváření, čtení, aktualizaci a mazání (CRUD operace) nad objekty doménového modelu.

## 22. Sériový plán vs. serializovatelný plán
### a) Sériový plán (Serializable Schedule):
Sériový plán je plán provádění transakcí v databázovém systému, ve kterém jsou transakce prováděny tak, aby se výsledek provádění transakcí zdál být ekvivalentní sekvenci provádění jednotlivých transakcí za sebou. To
znamená, že žádná transakce nevidí změny provedené jinou transakcí, dokud nejsou dokončeny.
### b) Serializovatelný plán (Serializable Schedule):
Serializovatelný plán je zvláštní typ sériového plánu, který dodržuje vlastnosti serializace transakcí. To znamená, že výsledek provádění transakcí je ekvivalentní nějaké sekvenci sériových provádění těchto
transakcí. Přísné dvoufázové zamykání zaručuje, že plán bude vždy serializovatelný.

## 23. Plán vykonání dotazu SELECT * FROM user WHERE LOGIN = 'abc123' bez indexu vs. s indexem + Popsat plán vykonání dotazu "SELECT * FROM student WHERE login=@login", kdy login je indexem. + Popište plán dotazu SELECT * FROM tabulka WHERE login = abcde, kde login je index a tabulka je heap table.
### a) Bez indexu:
Bez indexu databázový systém musí prohledat každý záznam v tabulce user, aby našel řádky, které splňují podmínku LOGIN = 'abc123'. To může být pomalé, zejména pokud je tabulka velká.
### b) S indexem:
S použitím indexu databázový systém může rychle lokalizovat záznamy, které odpovídají hledané podmínce. Index na sloupci LOGIN zrychlí vyhledávání, protože databázový systém může využít vyhledávací strom (např. B-strom) k rychlému nalezení relevantních záznamů.

---

- V indexu (obvykle B+ strom) se najde klíč login, pokud je unikátní, jedná se o UNIQUE SCAN.
- Pokud ne, tak se najde nejnižší hodnota a poté se jde dále pomocí zřetězených odkazů v listech (RANGE SCAN). 
- Takto se najde rowid záznamu v tabulce typu halda a k tomu se přistoupí a načtou se všechna data

---

- V indexu se nalezne prvek s loginem abcde (průchod B+ stromem, rychlé, ale náhodný přístup k datům na disku/v bufferu) - UNIQUE SCAN 
- Podle ROWID z indexu se načte záznam z tabulky a vyberou se všechny atributy - TABLE ACCESS BY ROWID / RID Lookup



## 24. Jak se v SQL tvoří index nad tabulkou a jaké informace jsou v něm uloženy? Pro jaké dotazy je index vhodný?
Index nad tabulkou se v SQL tvoří pomocí příkazu CREATE INDEX. Index obsahuje seznam hodnot sloupce nebo sloupců v tabulce, které jsou seřazeny tak, aby urychlily vyhledávání dat. Informace uložené v indexu zahrnují hodnoty sloupců, na kterých je index vytvořen, a ukazatele na odpovídající řádky v tabulce. Indexy jsou vhodné pro dotazy, které často filtrují nebo řadí data podle hodnot v určitých sloupcích.

## 25. Jaké atributy jsou kandidáty pro vytvoření indexu?
Atributy, které jsou často používány ve filtracích, řazení nebo spojování dat, jsou dobrými kandidáty pro vytvoření indexu. To zahrnuje sloupce používané v WHERE klauzulích, ORDER BY klauzulích, JOIN podmínkách nebo sloupce používané v agregovaných funkcích jako je GROUP BY.

---
- Index se vytváří obvykle pro primární klíče a cizí klíče
- Potencionální kandidáty jsou atributy vyskytující se často v klauzuli WHERE
- Výhody – rychlejší prohledávání tabulek
- Nevýhody – každý index znamená zvýšení počtu operací při změnách v DB
---
- Index se vytváří pro klíče a cizí klíče
- Index je vytvořen pokud:
  - Bude používán k nalezení malého počtu záznamů
  - Pokryje jeden nebo více dotazů
- Potencionální kandidáty jsou atributy vyskytující se často v klauzuli WHERE
- Každý index znamená zvýšení počtu operací při změnách v DB – vytvoření musíme zvážit

## 26. Co může nastat u uncommited read a co ne u commited read izolace transakce + příklad? + Jykým způsobem není u read uncommited dodrženo dvoufáz. uzamykání a příklad dirty read. se dvěma souběžnýma transakcema
U uncommitted read izolace transakce může nastat následující:
- Dirty Read:
Transakce může číst hodnoty dat, které byly změněny jinou transakcí, ale ještě nebyly potvrzeny (commitovány). Tento stav může vést k nekonzistentním datům, protože transakce může vidět dočasné změny, které nakonec nebudou trvalé. U committed read izolace transakce se toto nemůže stát, protože v této izolaci jsou čtena pouze data, která byla již potvrzena (commitována).

---

Při úrovni izolace transakce READ UNCOMMITTED není dodrženo dvoufázové uzamykání. To znamená, že transakce nečeká na potvrzení uzamčení záznamu před jeho čtením. To může vést ke špinavému čtení (dirty read), kdy jedna transakce čte nekonzistentní data z jiné transakce před jejím potvrzením.
Například:
- Transakce A provádí aktualizaci záznamu.
- Transakce B čte tento záznam předtím, než je změna potvrzena transakcí A.

Pokud dojde ke zrušení transakce A, změna se neuloží, ale transakce B již
mohla načíst nekonzistentní data.

## 27. SQL injection, co to je a jak jej lze eliminovat?
SQL injection je technika útoku, při které útočník vkládá nežádoucí SQL kód do vstupního pole webové aplikace nebo do jiného uživatelsky ovládaného vstupu. Cílem je získat neoprávněný přístup k databázi nebo narušit její funkci.

---
### Eliminace SQL injection zahrnuje následující opatření:
#### a) Použití parametrizovaných dotazů:
Namísto sestavování SQL dotazů pomocí konkrétních hodnot přímo v řetězcích je doporučeno používat parametry dotazu. Tím se zabrání útočníkovi v přímém vložení SQL kódu do dotazu.
#### b) Ošetření uživatelského vstupu::
Vstup od uživatele by měl být důkladně ověřen a validován tak, aby se zabránilo vkládání nežádoucího SQL kódu. To zahrnuje kontrolu formátu, délky a povolených znaků.
#### c) Omezení přístupových práv:
Databázové účty by měly mít co nejmenší oprávnění k databázovým objektům, což může minimalizovat škody způsobené útokem SQL injection.

### 28. Popište význam kontrolních bodů při zotavení databáze pomocí UNDO/REDO algoritmu
Kontrolní body při zotavení databáze jsou klíčové body v historii transakcí,
ve kterých jsou uchovávány informace nezbytné pro obnovu databáze po selhání nebo havárii.
Tyto kontrolní body jsou vytvářeny periodicky nebo po určitých událostech a jsou využívány
při použití algoritmů UNDO/REDO pro obnovu databáze.

---

### a) UNDO/REDO algoritmus:
Tento algoritmus je používán pro obnovu databáze po selhání nebo havárii. UNDO fáze obnovuje databázi do stavu před selháním pomocí transakčního logu, zatímco REDO fáze aplikuje změny, které byly provedeny, ale ještě nebyly trvale zapsány do databáze. Kombinace těchto dvou fází zajistí, že databáze je obnovena do konzistentního stavu.
### b) Význam kontrolních bodů:
Kontrolní body jsou důležité, protože umožňují omezit množství práce potřebné k obnově databáze po selhání. Namísto toho, aby byla provedena kompletní obnova z počátku, může být obnova zahájena od posledního kontrolního bodu, což šetří čas a zdroje.

## 29. Popište rozdíl mezi problémy souběhu neopakovatelné čtení a výskyt fantomů, ukažte na příkladech paralelních transakcí.
### a) Souběh neopakovatelného čtení:
Tento problém nastává, když jedna transakce čte data, která byla změněna jinou transakcí a ještě nebyla potvrzena. To vede k tomu, že transakce může vidět nekonzistentní stavy dat.
## b) Výskyt fantomů:
V tomto případě transakce čte soubor dat, který neexistoval při předchozím čtení, protože jiná transakce provedla vložení nového záznamu mezi jednotlivými čteními. To vede k tomu, že transakce vidí neočekávané změny v datech.



## 30. Popište rozdíl mezi shlukovanou tabulkou implementovanou B-stromem a indexem implementovaným B-stromem.
#### a) Shlukovaná tabulka implementovaná B-stromem:
V tomto případě jsou data ve shlukované tabulce fyzicky uložena v pořadí definovaném B-stromem. To znamená, že záznamy jsou uspořádány na disku podle klíčů v indexu B-stromu.
#### b) Index implementovaný B-stromem:
Index B-stromu je struktura, která uchovává informace o pořadí dat v tabulce, ale data samotná nejsou uložena v tomto pořadí. Index umožňuje efektivní vyhledávání a přístup k datům v tabulce na základě klíčů.

### Algoritmus zotavení
- Po restartu DBS se spustí algo:
  - Vytvoří se 2 seznamy transakcí: UNDO a REDO
-	Do UNDO vlož všechny transakce, které nebyly dokončeny před posledním kontrolním bodem. REDO je prázdný.
-	Začni procházet záznamy v logu od posledního kontrolního bodu. Pokud je pro transakci T nalezen v logu záznam COMMIT, přesuň T z UNDO do REDO.
-	Systém projde log zpětně a ruší aktualizace transakcí z UNDO
-	Systém projde logem dopředu a přepracovává aktualizace transakcí ze seznamu REDO
-	DB je v korektním stavu

#### Záchranné body (savepoints)
-	Rozdělují transakci na menší části. ROLLBACK TO \<**jmenobodu**\> vrátí transakci do ZB. SAVEPOINT \<**jmeno**\>, RELEASE\<**jmeno**\> zrušení

Zotavení znamená zotavení databáze z nějaké chyby. Výsledkem zotavení musí být korektní stav DB.

Transakce je logická (atomická) jednotka práce s DB, začíná BEGIN TRANSACTION a končí COMMIT nebo ROLLBACKem. Úkolem transakce je převést korektní stav DB na jiný korektní stav, přičemž nemusí zanechat DB v korektním stavu po jednotlivých aktualizacích transakce.

COMMIT – úspěšné dokončení transakce. DB je v korektním stavu, změny můžou být uloženy trvale v DB
ROLLBACK – neúspěšné provedení transakce. DB může být v nekorektním stavu, všechny změny provedené v rámci transakce musí být zrušeny

#### Lokální chyby
-	Chyba v dotazu
-	Přetečení hodnoty atributu

#### Chyby globální
-	Systémové – výpadek proudu, pád systému či SŘBD (soft crash)
-	Chyby média (hard crash)

Konzistentní DB – v DB neexistují žádné výjimky z daných integritních omezení
Korektní – transakce je posloupnost operací převádějící DB v korektním stavu do jiného korektního stavu. Respektujeme výsledek operací, které jsou vykonány v reálném světě

#### Potvrzovací bod
-	Transakce začíná operací BEGIN TRANSACTION a končí COMMIT nebo ROLLBACK
-	Operace COMMIT zavádí tzv. Commit point (do logu je zapsán Commit záznam)
-	ROLLBACK vrací DB do stavu, ve kterém byla před BEGIN TRANSACTION – vrací DB k předchozímu COMMIT POINTU

#### DTO – Data Transfer Object
-	Např. třída Person pro tabulku Person
-	Jeden objekt prezentuje jeden záznam – řádek tabulky

#### DAO – Data Access Object
-	Jedna třída prezentuje jednu tabulku a její operace
-	Např. třída PersonTable se statickými metodami Select, Insert… pro tabulku Person
-	Používáme parametrizované operace z důvodu zabránění SQL injection

Entita v ORM je objekt, který je uložen v databázi (jeden záznam)

#### Vazba 1:1
-	Vztahy jsou reprezentovány referencemi, ne FK
-	Public class Uzivatel \{… private Ucet ucet; …\}
-	Public class Ucet \{ … \}

#### Vazba 1:N
-	Public class Uzivatel \{… …\}
-	Public class Ucet \{ … private User user; …\}

Nebo

-	Public class Uzivatel \{… private List \<Ucet\> ucet = new ArrayList \<Ucet\>(); …\}
-	Public class Ucet \{ … \}



#### Tabulka typu Halda
- Vytvoří se po zadání CREATE TABLE
- Stránkované persistentní pole s velikostí bloku nejčastěji 8kB
- Záznamy v tabulce nejsou nijak uspořádány
- Záznamy nejsou fyzicky mazány, pouze označeny jako smazané
- Při vkládání je záznam umístěn na první volnou pozici nebo konec pole
- Nevýhody:
  -	Neefektivní hledání (Složitost O(n))
- Výhody:
   - Insert O(1) a využití místa

#### Shlukovaná tabulka
- Záznamy jsou seřazeny podle zvoleného klíče
- Pro implementaci je využita nějaká varianta B-stromu
- Používá se všude kde potřebujeme získat i hodnoty ostatních atributů kromě klíče
- Výhody:
  - složitost pro základní operace O(log n)
- Nevýhody:
  - Zhoršený výkon při INSERT – data se musí zatřídit



#### Plán dotazu
- Převod dotazu do interní formy
  - Eliminujeme syntaxi jazyka dotazu
  - Interní forma je nejčastěji nějaký druh dotazovacího stromu (query tree). Dotazovací strom můžeme chápat jako reprezentaci výrazu relační algebry
  - Nahradíme pohled jeho definicí
- Převod dotazu do kanonické formy
  - Provádí se řada optimalizací
  - Dochází k odstranění rozdílů a k nalezení efektivnějšího tvaru než původní dotaz
  - Optimalizátor aplikuje transformační pravidla, která převádí výraz na ekvivalentní (výraz se stejným výsledkem), např.
    - (A JOIN B) WHERE restrikce na A  transformujeme na:
    - (A WHERE restrikce na A) JOIN B
- Vygenerování plánu dotazu a výběr nejlevnějšího plánu
  - Optimalizátor vytváří množinu dotazovacích plánů
  - Každému plánu je přiřazena cena (I/O nebo CPU cost)
  - Cena je závislá na mohutnosti vstupních relací, mezivýsledků…
  - Z této množiny pak vybírá ten nejlevnější

#### Operace plánu dotazu:
- Table access (full) – Select * from Tabulka;
- Table access (full) se selekcí – select * from tabulka where name=‘pepa‘; name není indexová
- Index (unique scan) – select id from Tab Where id=50; pokud je id indexován, cost = 1
- Index (range scan)
- Table access (by index ROWID) – select name from Tab where id = 5; cost = 1
- Selekce
- Projekce
- Join – spojení se provádí zahnízděnými cykly
- Sort



#### Klasifikace DB systémů
- Jednouživatelský
- Víceuživatelský – v tomto případě mluvíme o souběhu
  - Souběh umožňuje SŘBD zpřístupnit databázi mnoha transakcím ve stejném čase



Posloupnost operací transakcí se nazývá plán
Problémy souběhu
- Ztráta aktualizace
- Konflikty čtení/zápisu
  - problém nastává pokud dvě transakce A a B chtějí číst nebo zapisovat stejnou entici
  - RW konflikt
    - A čte t a B chce zapsat t. Pokud B vykoná tuto aktualizaci, pak může nastat problém nekonzistentní analýzy
    - Pokud B vykoná aktualizace a A načte t znovu, pak A získá odlišné hodnoty = neopakovatelné čtení
  - Obrázek stejný, místo (další výpočet) je READ t
  - WR konflikt
    - A zapíše t a B pak chce číst t
    - Pokud B vykoná tuto operaci, pak může nastat problém nepotvrzené závislosti
    - Pokud B přečte t, mluvíme o tzv. špinavém čtení (dirty read)
  - WW konflikt
    - A zapíše t a pak B chce zapsat t. Pokud B vykoná tuto aktualizaci, pak může nastat jak problém ztráty aktualizace (pro A) tak problém nepotvrzené závislosti (pro B)
    - Pokud B zapíše t, mluvíme o tzv. špinavém zápise (dirty write)

#### Techniky řízení souběhu
- Zamykání
- Pokud transakce A chce provést čtení nebo zápis nějakého objektu v DB, pak požádá o zámek na tento objekt
- Význam zámků – žádná jiná paralelní transakce nemůže získat získat zámek a nemůže tedy provést čtení či aktualizaci do doby, než A zámek uvolní
- Výlučný zámek X, Sdílený zámek S
- Uzamykací protokol (dvoufázové uzamykání):
- Transakce, která chce získat entici z DB, musí požádat o sdílený zámek
- -||- aktualizovat entici musí požadovat výlučný zámek
- Pokud zámek požadovaný transakcí B nemůže být přidělen okamžitě, pak B přejde do stavu čekání
- Zámky jsou uvolněny na konci transakce

#### Uváznutí
- Je situace, kdy více transakcí jsou ve stavu čekání a čekají na uvolnění zámků
- Řešení
- Detekce uváznutí – nastavení časových limitů, detekce cyklu v grafu Wait-For
- Prevence uváznutí pomocí časových razítek
- Nastavení časových limitů:
- Systém předpokládá, že transakce může trvat nejdéle nějakou dobu
- Pokud trvá déle, systém detekuje uváznutí
- Detekce cyklu v grafu:
- Efektivnější
- Zaznamenává jaké transakce na sebe vzájemně čekají
- Řešení spočívá ve výběru jedné z uváznutých transakcí a provedení ROLLBACK (uvolní zámky). Ostatní transakce pokračují v činnosti
- Zrušená transakce je spuštěna znovu nebo vygenerována výjimka o zrušení transakce
- Řešení uváznutí
- Dvě verze protokolu: Wait-Die, Wound-Wait
- Každé transakci je přiděleno časové razítko – čas začátku transakce.
- Pokud A požaduje zámek na entici, která je uzamčena transakcí B, pak:
  - Wait-Die: pokud A je starší než B, pak A čeká. Pokud A je mladší, A je zrušena ROLLBACKem a spuštěna znovu (zemře)
  - Wound-Wait: pokud A je mladší, A čeká. Pokud A je starší, B je zrušena ROLLBACKem a spuštěna znovu (wound)



#### Úroveň izolace transakce
- Serializovatelnost garantuje izolaci transakcí ve smyslu podmínky ACID
- Pokud je plán transakcí serializovatelný, pak se neprojevují negativní vlivy souběhu
- Izolovanost ale znamená menší výkon souběhu
- SŘBD umožňují nastavit úroveň izolace:
  - READ UNCOMMITED
  - READ COMMITED
  - REPEATABLE READ
  - SERIALIZABLE (nejvyšší úroveň)
- Vyšší úroveň značí vyšší míru izolace, ale nižší propustnost



#### Syntaxe transakcí
```sql
START TRANSACTION ISOLATION LEVEL <izolace> (READ UNCOMMITED, READ COMMITED, RR., SR.)

SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
```

#### Granularita zámků
- Můžeme uzamykat např. hodnoty atributů, záznamů, tabulek..
- Zvýšení propustnosti DB systému
- Zamknutím menších objektů zlepšíme míru paralelizace (jemná granularita)
- Zamknutí větších objektů znamená menší počet zámků a teda menší režii zamykání (hrubá granularita)
- Např. zamknutím celé DB zamezíme paralelnímu přístupu
- Tohle téma jsem přeskočil…

#### Správa verzí
- Optimistický přístup
- Předpokládáme, že paralelní transakce se nebudou vzájemně ovlivňovat
- Nevýhoda: velká interní režie – zvýšený požadavek na paměť při správě kopií dat
- Výhoda: efektivnější (než zamykání) pokud převažují READ operace

#### Úroveň READ COMMITED
- Vhodná v případě prostředí s málo konflikty souběhu
- Např. pokud dotaz prochází celou tabulku s milionem záznamů a další transakce aktualizuje záznam 150 000, pak původní transakce nevidí tuto změnu

#### Úroveň SERIALIZABLE
- Každý dotaz spuštěný transakcí vidí data potvrzená před začátkem transakce a změny provedené samotnou transakcí
- Vhodná pro:
  - velké DB a krátké transakce
  - dlouhé transakce používající čtení

#### Úroveň READ ONLY
- vhodná pro generování sestav, u kterých požadujeme konzistentní obsah
- Transakce nesmí aktualizovat data


#### Zámky tabulek
- ROW SHARE, ROW EXCLUSIVE, SHARE, SHARE ROW EXCLUSIVE, EXCLUSIVE

#### Explicitní zamykání
- Programátor žádá o přidělení zámku explicitně
- Např. LOCK TABLE, SELECT FOR UPDATE



#### Rozdíl mezi T-SQL a PL/SQL
- T-SQL
- Nejsou operátory %TYPE, %ROWTYPE, nepodporuje CREATE OR REPLACE PROCEDURE
- Musíme při práci s kurzory používat OPEN, FETCH, CLOSE a DEALLOCATE. Nutí nás k dvojitému FETCH u kurzorů
- Musíme definovat u parametrů procedur a funkcí délku datového typu
- U triggerů tabulky INSERTED, DELETED
- Proměnné @name
DECLARE @cnt INT
- PL/SQL
  - U triggerů :OLD, :NEW

T-SQL neposkytuje operátory %TYPE, %ROWTYPE (namísto %ROWTYPE můžeme použít dočasnou pamět’ovou tabulku (temporary table), kterou označujeme prefixem #)
T-SQL nepodporuje CREATE OR REPLACE PROCEDURE, což nás nutí k zápisu:

/*CREATE*/ ALTER PROCEDURE 
(od verze 2016 můžeme používat CREATE OR ALTER PROCEDURE)

T-SQL omezuje konstrukce, které můžeme využívat u funkcí
V T-SQL musíme pro práci s kurzory používat OPEN, FETCH, CLOSE, DEALLOCATE
T-SQL nás nutí k dvojitému FETCH u kurzorů
V T-SQL musíme definovat u parametrů procedur a funkcí délku datového typu  (pokud se u datového typu udává)

Aplikační objekty v ORM 
DTO (data transfer object) - objekt přenášející data. Představuje jeden záznam (řádek) z tabulky.