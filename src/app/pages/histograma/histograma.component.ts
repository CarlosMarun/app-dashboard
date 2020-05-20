import { Component, OnInit } from "@angular/core";
import { NorthwindService } from "src/app/services/northwind.service";
import { Label } from "ng2-charts";
import { ChartDataSets } from "chart.js";

@Component({
  selector: "app-histograma",
  templateUrl: "./histograma.component.html",
  styleUrls: ["./histograma.component.scss"],
})
export class HistogramaComponent implements OnInit {
  constructor(private north: NorthwindService) {}

  labels: Label[] = [];
  values: ChartDataSets[] = [];

  defaultBindingsListDim = [
    { value: 1, label: "Cliente" },
    { value: 2, label: "Producto" },
    { value: 3, label: "Empleado" },
  ];
  defaultBindingsListOrder = [
    { value: 1, label: "DESC" },
    { value: 2, label: "ASC" },
  ];

  selectedDimension = null;
  selectedOrder = null;

  ngOnInit(): void {
    this.selectedDimension = this.defaultBindingsListDim[0].label;
    this.selectedOrder = this.defaultBindingsListOrder[0].label;
    this.north
      .getSerieHistorica(this.selectedDimension, this.selectedOrder)
      .subscribe((result: any) => {
        this.labels = result.clientes;
        this.values = result.data[0];
      });
  }

  onChangeDimension($event) {
    this.selectedDimension = $event.label;
    this.north
      .getSerieHistorica(this.selectedDimension, this.selectedOrder)
      .subscribe((result: any) => {
        this.labels = result.clientes;
        this.values = result.data[0];
      });
  }
  onChangeOrder($event) {
    this.selectedOrder = $event.label;
    this.north
      .getSerieHistorica(this.selectedDimension, this.selectedOrder)
      .subscribe((result: any) => {
        this.labels = result.clientes;
        this.values = result.data[0];
      });
  }
}
