<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDipendenteTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dipendente', function (Blueprint $table) {
            $mock_nullable=true;
            $table->increments('id_dipendente');
            $table->string('nome')->nullable($mock_nullable);
            $table->string('cognome')->nullable($mock_nullable);
            $table->string('email')->unique()->nullable($mock_nullable);
            $table->string('codice_fiscale')->unique()->nullable($mock_nullable);
            $table->timestamp('data_nascita')->nullable($mock_nullable);
            $table->string('password')->nullable($mock_nullable);
            $table->string('iban')->nullable(true);
            $table->enum('banca' , ['Monte Paschi', 'Poste Italiane'])->nullable($mock_nullable);
            $table->string('bbc')->nullable($mock_nullable);
            $table->enum('ruolo', ['manager', 'dipendente'])->nullable($mock_nullable);	
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dipendente');
    }
}
