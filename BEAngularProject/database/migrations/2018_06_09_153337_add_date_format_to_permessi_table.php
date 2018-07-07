<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddDateFormatToPermessiTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('permessi', function($table) {
            $table->timestamp('data_inizio')->nullable()->default(null);
            $table->timestamp('data_fine')->nullable()->default(null);;
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
            $table->dropColumn('data_inizio');
            $table->dropColumn('data_fine');
        });
    }
}
