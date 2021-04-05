# JS Cookies

## Narzędzie spełnia poniższe założenia:
-  napisano w czystym JS, żadnych dodatkowych bibliotek,
frameworków, jQuery
- JS osadzony w head strony
- Wyświetla popup informacyjny na środku strony o tytule “GDPR consent”,
jednocześnie wyłoczona możliwość scrollowania strony
- Po wyświetleniu popupu tło strony zostaje zblurowane
- Popup zawiera listę zaufanych partnerów (vendors) pobranych z
https://optad360.mgr.consensu.org/cmp/v2/vendor-list.json
- Dodatkowo przy każdym z partnerów powinien pojawić się link do polityki cookie
(policyUrl), oraz możliwość akceptacji danego partnera
- Popup zawiera dwa przyciski: Accept oraz Reject, decyzja użytkownika wraz z
zaakceptowanymi partnerami zostaje zapisana jako jedno cookies
- Po odświeżeniu strony popup wyświetla się ponownie, jednak dopiero po
24 godzinach od poprzedniej decyzji użytkownika
