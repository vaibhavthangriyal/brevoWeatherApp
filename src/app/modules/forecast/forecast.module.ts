import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastComponent } from './forecast/forecast.component';
import { ForecastRoutingModule } from './forecast-routing.module';
import { ForecastService } from 'src/app/services/forecast.service';
import { CityService } from 'src/app/services/city.service';
import { FormsModule } from '@angular/forms';
import { CustomDropdownComponent } from 'src/app/components/custom-dropdown/custom-dropdown.component';
import { SearchPipe } from 'src/app/pipes/search.pipe';

@NgModule({
  declarations: [ForecastComponent, CustomDropdownComponent, SearchPipe],
  imports: [CommonModule, ForecastRoutingModule, FormsModule],
  exports: [ForecastRoutingModule],
  providers: [ForecastService, CityService],
})
export class ForecastModule {}
