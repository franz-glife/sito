/**
 * Cookie Banner - Generame
 * Gestisce il consenso ai cookie secondo GDPR/ePrivacy
 *
 * IMPORTANTE: Non inserire MAI script di tracking direttamente nell'HTML.
 * Questo script li carica dinamicamente solo dopo il consenso.
 */

(function() {
    'use strict';

    // =========================================
    // CONFIGURAZIONE - Inserisci qui i tuoi ID
    // =========================================
    const CONFIG = {
        // Meta (Facebook) Pixel ID - Lascia vuoto se non hai ancora il pixel
        META_PIXEL_ID: '',  // Es: '1234567890123456'

        // Google Analytics 4 Measurement ID
        GA4_ID: '',  // Es: 'G-XXXXXXXXXX'

        // Durata cookie consenso (giorni)
        COOKIE_DURATION: 365,

        // Nome cookie consenso
        COOKIE_NAME: 'generame_cookie_consent'
    };

    // =========================================
    // GOOGLE CONSENT MODE V2
    // Imposta il default PRIMA di qualsiasi script Google
    // =========================================
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}

    // Default: tutto negato fino al consenso
    gtag('consent', 'default', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied',
        'functionality_storage': 'granted',  // Cookie tecnici OK
        'personalization_storage': 'denied',
        'security_storage': 'granted',  // Cookie sicurezza OK
        'wait_for_update': 500  // Attende 500ms per il consenso
    });

    // =========================================
    // FUNZIONI UTILITÀ
    // =========================================

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const secure = location.protocol === 'https:' ? ';Secure' : '';
        document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/;SameSite=Lax${secure}`;
    }

    function hasConsent() {
        return getCookie(CONFIG.COOKIE_NAME) !== null;
    }

    function getConsentValue() {
        return getCookie(CONFIG.COOKIE_NAME);
    }

    // =========================================
    // CARICAMENTO DINAMICO SCRIPT
    // =========================================

    function loadScript(src, callback) {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        if (callback) {
            script.onload = callback;
        }
        document.head.appendChild(script);
    }

    // Google Analytics 4
    function loadGoogleAnalytics() {
        if (!CONFIG.GA4_ID) return;

        loadScript(`https://www.googletagmanager.com/gtag/js?id=${CONFIG.GA4_ID}`, function() {
            gtag('js', new Date());
            gtag('config', CONFIG.GA4_ID, {
                'anonymize_ip': true,
                'cookie_flags': 'SameSite=Lax;Secure'
            });
        });
    }

    // Meta (Facebook) Pixel
    function loadMetaPixel() {
        if (!CONFIG.META_PIXEL_ID) return;

        // Inizializza fbq
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');

        fbq('init', CONFIG.META_PIXEL_ID);
        fbq('track', 'PageView');
    }

    // =========================================
    // GESTIONE CONSENSO
    // =========================================

    function updateGoogleConsent(granted) {
        gtag('consent', 'update', {
            'ad_storage': granted ? 'granted' : 'denied',
            'ad_user_data': granted ? 'granted' : 'denied',
            'ad_personalization': granted ? 'granted' : 'denied',
            'analytics_storage': granted ? 'granted' : 'denied',
            'personalization_storage': granted ? 'granted' : 'denied'
        });
    }

    function loadAllTracking() {
        // Aggiorna Google Consent Mode
        updateGoogleConsent(true);

        // Carica gli script
        loadGoogleAnalytics();
        loadMetaPixel();

        // Dispatch evento per altri script che potrebbero ascoltare
        window.dispatchEvent(new CustomEvent('cookieConsentGranted'));
    }

    function revokeTracking() {
        // Aggiorna Google Consent Mode
        updateGoogleConsent(false);

        // Dispatch evento
        window.dispatchEvent(new CustomEvent('cookieConsentRevoked'));

        // Nota: i cookie già impostati da FB/GA non possono essere rimossi
        // da JavaScript (sono HttpOnly). Verranno ignorati con consent denied.
    }

    // =========================================
    // UI BANNER
    // =========================================

    function showBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            setTimeout(function() {
                banner.classList.add('visible');
            }, 500);
        }
    }

    function hideBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.classList.remove('visible');
        }
    }

    function acceptCookies() {
        setCookie(CONFIG.COOKIE_NAME, 'accepted', CONFIG.COOKIE_DURATION);
        hideBanner();
        loadAllTracking();
    }

    function rejectCookies() {
        setCookie(CONFIG.COOKIE_NAME, 'rejected', CONFIG.COOKIE_DURATION);
        hideBanner();
        revokeTracking();
    }

    // =========================================
    // INIZIALIZZAZIONE
    // =========================================

    function init() {
        const consent = getConsentValue();

        if (!consent) {
            // Nessun consenso ancora dato: mostra banner
            // Gli script di tracking NON vengono caricati
            showBanner();
        } else if (consent === 'accepted') {
            // Consenso già dato in precedenza: carica tracking
            loadAllTracking();
        } else {
            // Consenso rifiutato: non fare nulla
            // Gli script rimangono bloccati
        }

        // Event listeners
        const acceptBtn = document.getElementById('cookie-accept');
        const rejectBtn = document.getElementById('cookie-reject');

        if (acceptBtn) {
            acceptBtn.addEventListener('click', acceptCookies);
        }

        if (rejectBtn) {
            rejectBtn.addEventListener('click', rejectCookies);
        }
    }

    // Avvia quando il DOM è pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // =========================================
    // API PUBBLICA
    // Per uso da altri script se necessario
    // =========================================
    window.GenerameCookies = {
        hasConsent: hasConsent,
        getConsent: getConsentValue,
        accept: acceptCookies,
        reject: rejectCookies,
        // Per aggiungere listener
        onAccept: function(callback) {
            window.addEventListener('cookieConsentGranted', callback);
        },
        onReject: function(callback) {
            window.addEventListener('cookieConsentRevoked', callback);
        }
    };

})();
