# Generame - Istruzioni Progetto

## Contesto
Sito statico per Generame, brand luxury italiano di cosmetici epigenetici e integratori alimentari. Fondato nel 2009, sede a Trieste (Area Science Park).

## Design System

### Colori (SEMPRE usare questi)
```css
--color-cream: #FAF7F2    /* Background principale */
--color-sand: #E8E2D9     /* Background secondario */
--color-stone: #B8AFA3    /* Testi secondari */
--color-charcoal: #2C2C2C /* Testi principali */
--color-deep: #1A1A1A     /* Nero profondo */
--color-accent: #8B7355   /* Accenti/CTA */
--color-accent-light: #C4A77D /* Accenti su sfondo scuro */
```

### Typography
- Titoli: `Cormorant Garamond` (elegante, serif)
- Body: `Outfit` (moderno, sans-serif)

### Stile
- Estetica luxury/raffinata
- Spazi ampi, respiro visivo
- CTA con bordi netti (no border-radius)
- Tono: sofisticato ma accessibile

## Struttura URL
Usare sempre `/nomepagina/` (con trailing slash) per compatibilità GitHub Pages.

## Prodotti

### Cosmetici (prezzo promo €34)
- D-Cream: crema giorno, prezzo pieno €96
- N-Cream: crema notte, prezzo pieno €114

### Integratori (prezzo pieno)
- Sharp: €45 (energia, Rhodiola RodioX2)
- Derma Renew MSM: €54 (pelle, BosweX2)
- Move3: €24.80 (articolazioni, BosweX2)
- Age Defence NAD+: €54, 30 capsule, 1/giorno (antiossidante)

## Funnel
1. Ads → Landing → Acquisto crema €34 (sconto >€50)
2. Email nurturing 30 giorni (Brevo)
3. Giorno 25-30: invito Premium Club

## Premium Club
- €34/mese fisso
- Libertà totale: cambia prodotto ogni mese (creme O integratori)
- Prezzo bloccato per sempre
- Nessun vincolo, pausa/cancella quando vuoi

## Integrazioni (da completare)
- Stripe: Payment Links + Subscriptions
- Brevo: Email automation
- Hosting: GitHub Pages

## Comandi utili
```bash
# Server locale
python3 -m http.server 8000
```

## Note importanti
- NON usare colori diversi dal design system
- Mantenere tono luxury nel copy
- Usare tecniche persuasive: Cialdini, reciprocità, commitment
- Target: donne 35-55, attente alla qualità
