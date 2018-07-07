<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemoveDateFormatFromPermessiTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('permessi', function($table) {
            $table->dropColumn('data_inizio');
            $table->dropColumn('data_fine');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('permessi', function($table) {
            $table->string('data_inizio');
            $table->string('data_fine');
        });
    }
}
