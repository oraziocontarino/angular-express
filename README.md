# Progetto Angular
- Esegui `git clone https://github.com/oraziocontarino/angularproject.git`  
# Configurazione BackEnd (BE) 
### Prerequisiti:  
- **COMPOSER**  
- **XAMPP** 
  - Apache
  - MySQL
  
### Configurazione ambiente di sviluppo e progetto BE:
- Aggiungi alla variabile PATH di sistema i path per i comandi `php` e `composer`.
- Apri il terminale.
- Esegui `cd angularproject/BEAngularProject`.
- Apri la cartella dove è stato installato xampp, modifica il file httpd.conf di Apache (`xampp > apache > conf`) ed incolla alla fine del file la seguente configurazione:

    ```  
    #!conf  
    alias /angularproject/be "C:/Path/To/angularproject/BEAngularProject/public"  
    <Directory "C:/Path/To/angularproject/BEAngularProject/public">  
    AllowOverride all  
    Require all granted  
    </Directory>  
    ```
    (sostituire Path/To/ con il percorso esatto della cartella `angularproject/BEAngularProject` ottenuta dal comando `git clone`)

- Avvia XAMPP.
- Avvia i servizi Apache e MySQL dal client XAMPP.
- Accedi all'indirizzo `http://localhost/phpmyadmin` quindi crea il database `angularproject` cliccando su `nuovo` (menù laterale sinistro).  
- Ritorna al terminale, nella cartella di progetto `angularproject/BEAngularProject`.
- Esegui `copy .env.example .env`: il comando genera il file di configurazione *.env* utilizzato da Laravel.
- Modifica il contenuto del file .env creato al punto precedente come segue:

    ```  
    APP_NAME=Laravel
    APP_ENV=local
    APP_KEY=
    APP_DEBUG=true
    APP_URL=http://localhost
    #------------------#
    LOG_CHANNEL=stack
    #------------------#
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=angularproject
    DB_USERNAME=root
    DB_PASSWORD=
    #------------------#
    BROADCAST_DRIVER=log
    CACHE_DRIVER=file
    SESSION_DRIVER=file
    SESSION_LIFETIME=120
    QUEUE_DRIVER=sync
    #------------------#
    REDIS_HOST=127.0.0.1
    REDIS_PASSWORD=null
    REDIS_PORT=6379
    #------------------#
    MAIL_DRIVER=smtp
    MAIL_HOST=
    MAIL_PORT=
    MAIL_USERNAME=
    MAIL_PASSWORD=
    MAIL_ENCRYPTION=tls
    #------------------#
    PUSHER_APP_ID=
    PUSHER_APP_KEY=
    PUSHER_APP_SECRET=
    PUSHER_APP_CLUSTER=mt1
    #------------------#
    MIX_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
    MIX_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
    #------------------#
    JWT_SECRET=
    ```

- Esegui `composer install`
- Esegui `php artisan key:generate`
- Esegui `php artisan jwt:secret`
- Esegui `php artisan migrate`
- Esegui `php artisan db:seed --class=InitDatabaseSeeder`

# Configurazione Frontend (FE)  
### Prerequisiti:  
- NodeJS   
### Configurazione ambiente di sviluppo e progetto FE:
- Assicurati di avere i comandi `npm`, `ng`, `ts` nel PATH (eseguibili da terminale)
- Esegui `cd C:/Path/To/FEAngularProject/`
- Esegui `npm install`
- Esegui `ng serve --open`
 
### Credenziali di accesso  
- Utente Manager:  
  Username: `CNTRZO94P28C351T`  
  Password: `prova123`  
- Utente Dipendente:  
  Username: `LNGGNN93P12C351O`  
  Password: `prova321`  
  