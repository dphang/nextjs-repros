# nextjs-repros

This issue shows incorrect default static 500.html when locales are used and Next.js == 10.2.3

It generates incorrect 500.html page in `.next/server/pages/<locale>/500.html` which says "404: Page Not found" instead of "500: Internal Server Error" as expected. Without locales, it works fine. The workaround for now is to create a 500.js page