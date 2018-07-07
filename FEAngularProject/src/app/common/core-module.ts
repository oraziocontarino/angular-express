import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployerLogService } from '../../service/employer-log.service';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [ // components that we want to make available
    ],
    declarations: [ // components for use in THIS module
    ],
    providers: [ // singleton services
        EmployerLogService,
    ]
})
export class CoreModule { }
