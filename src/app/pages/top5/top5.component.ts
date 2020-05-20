import { Component, OnInit } from "@angular/core";
import { NorthwindService } from "src/app/services/northwind.service";
import { Label } from "ng2-charts";
import { Observable } from "rxjs";

@Component({
  selector: "app-top5",
  templateUrl: "./top5.component.html",
  styleUrls: ["./top5.component.scss"],
})
export class Top5Component implements OnInit {
  constructor(private north: NorthwindService) {}
  //DATA VARIABLES
  dataDimension: Label[] = [];
  dataValues: number[] = [];
  customer$: Observable<any>;
  selectedCustomer: any[] = [];

  defaultBindingsList = [
    { value: 1, label: "Cliente" },
    { value: 2, label: "Producto" },
    { value: 3, label: "Empleado" },
    { value: 4, label: "Tiempo" },
  ];

  selectedDimension = null;

  ngOnInit(): void {
    this.selectedDimension = this.defaultBindingsList[0];
    this.north
      .getTop5(this.selectedDimension.label, "DESC")
      .subscribe((result: any) => {
        this.dataDimension = result.datosDimension;
        this.dataValues = result.datosVenta;
      });

    this.customer$ = this.north.getDimensionItemsByName(
      this.selectedDimension.label,
      "DESC"
    );
  }

  onChangeDimension($event) {
    this.selectedDimension = $event.label;
    this.north
      .getTop5(this.selectedDimension, "DESC")
      .subscribe((result: any) => {
        this.dataDimension = result.datosDimension;
        this.dataValues = result.datosVenta;
      });
    this.customer$ = this.north.getDimensionItemsByName(
      this.selectedDimension,
      "DESC"
    );
  }

  clearModel() {
    this.selectedCustomer = [];
  }
}
