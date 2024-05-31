---
sidebar_position: 1
title: Složitosti
---

## Složitost algoritmů pro předmět UTI

Pro tuto látku je potřeba pochopit pořadí složitostí a potom co znamenají jednotlivé zápisy pro určení složitosti.

- $$log(n)$$
- $$\sqrt{x}$$
- $$n$$
- $$n*log(n)$$
- $$n^2$$
- $$n^3$$
- $$2^n$$
- $$n!$$
- $$n^n$$
- $$2^{2^n}$$

Svým způsobem je pořadí dost intuitivní, ale i tak je potřeba si ho trochu zapamatovat.
Nyní k zápisům a jednotlivým porovnáním a zjednodušením, které se provádějí.

Mějme funkce 

f1 = $$n^2 + 5n + 4$$

f2 = $$3n^3 + 3n^2 + 2n$$

f3 = $$log(2^n)$$

f4 = $$10n + 4$$

Jako první nás trápí, které funkce jsou složitější. Na první pohled vidíme, že **f2** roste rychleji, než **f1**, ale jak je to s dalšími funkcemi, které nejsou vidět na první pohled?
Pojďme to zjednodušit.

f1 = $$n^2$$

f2 = $$n^3$$

f3 = $$n*log(2)$$

f4 = $$n$$


Při určování složitostí můžeme "smazat" jakékoliv konstanty a násobení konstantama a cokoliv, co je "jen číslo", nebo zanedbatelné. 
Např. pokud máme něco $$n^3$$ tak cokoliv, co je $$n^2$$ a nižší nás nezajímá. Stejně jako $$3n^3$$ tak ta konstanta $$3$$ je zbytečná, protože nejvetší a nejhlavnější je složitost $$n^3$$, násobení konstantou $$3$$ už je zbytečné.
U logaritmu se dá aplikovat základní matematika, která říká, že pokud použijeme logaritmus na něco, co má exponent, tak ten exponent můžeme vytknout. Díky tomu nám vzniklo $$n * log(2)$$, jenže jak jsme si řekli, násobit konstantou je zbytečné, protože $$log(2)$$ je konstanta, můžeme ji smazat.

f1 = $$n^2$$

f2 = $$n^3$$

f3 = $$n$$

f4 = $$n$$


Nakonec po úpravách je jasně vidět, která funkce je rychlejší, nebo které jsou stejně rychlé.
Jdeme mrknout na nějaké pravidla zápisů a už si určíme na finále jak jsou na tom funkce.

$$f\in O(n)$$ funkce **f** roste **pomaleji, _nebo_ stejně rychle** než nějaké $$O$$ s nějakou složitostí $$n$$.
$$f\in o(n)$$ funkce **f** roste **pomaleji** než nějaké $$o$$ s nějakou složitostí $$n$$.

$$f\in \Omega(n)$$ funkce **f** roste **rychleji, _nebo_ stejně rychle** než nějaké $$\Omega$$ s nějakou složitostí $$n$$.
$$f\in \omega(n)$$ funkce **f** roste **rychleji** než nějaké $$\omega$$ s nějakou složitostí $$n$$.

$$f\in \Theta(n)$$ funkce **f** roste **stejně rychle** jako nějaké $$\Theta$$ s nějakou složitostí $$n$$.


pokud platí
$$f\in O(n)$$
potom **zároveň** platí
$$f\in o(n)$$

pokud platí
$$f\in \Omega(n)$$
potom **zároveň** platí
$$f\in \omega(n)$$

pokud platí
$$f\in \Theta(n)$$
potom **zároveň** platí
$$f\in \Omega(n)$$
$$f\in \Theta(n)$$
V tomto případě potom **ale neplatí**
$$f\in o(n)$$
$$f\in \omega(n)$$
protože $$O$$ a $$\Omega$$ připouští stejně rychle, proto když platí $$\Theta$$, která říká, že něco roste stejně rychle, tak platí $$O$$, $$\Omega$$, ale $$o$$ a $$\omega$$ stejně rychle nepřipouští, proto v tomto případě být nemůže.


Jak je to teda s funkcemi co jsme si ukázali?

$$f1\in O(f2)$$ - funkce se složitostí $$n^2$$ **roste pomaleji, nebo stejně rychle** jako funkce se složitostí $$n^3$$.
**Zároveň tedy platí** $$f1\in o(f2)$$

$$f1\in \Omega(f3)$$ - funkce se složitosti $$n^2$$ **roste rychleji, nebo stejně rychle** jako funkce se složitosti $$n$$.
**Zároveň tedy platí** $$f1\in \omega(f3)$$

$$f1\in \Omega(f4)$$ - funkce se složitosti $$n^2$$ **roste rychleji, nebo stejně rychle** jako funkce se složitosti $$n$$.
**Zároveň tedy platí** $$f1\in \omega(f4)$$

$$f3\in \Theta(f4)$$ - funkce se složitostí $$n$$ roste stejně rychle, jako funkce se složitostí $$n$$.
**Zároveň tedy platí** $$f3\in \Omega(f4) \space a \space f3\in O(f4)$$
**ALE NEPLATÍ** $$f3\in \omega(f4) \space ani \space f3\in o(f4)$$