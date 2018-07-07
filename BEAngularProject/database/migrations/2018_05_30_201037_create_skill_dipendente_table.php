<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSkillDipendenteTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('skill_dipendente', function (Blueprint $table) {
            $table->increments('id');
            $table->string('id_dipendente');
            $table->string('id_skill');
            $table->enum('seniority', [
                'Junior', 
                'Senior'
            ]); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('skill_dipendente');
    }
}
