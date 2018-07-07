<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePermessiTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('permessi', function (Blueprint $table) {
            $table->increments('id');
            $table->string('id_dipendente');	
            $table->string('data_inizio');
            $table->string('data_fine');
            $table->string('note');
            $table->enum('tipologia', ['ferie', 'malattia']);
            $table->enum('stato', ['approvato', 'rifiutato', 'pending']);	
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('permessi');
    }
}
