export interface HistorialRespuesta {
  process:   string;
  code:      number;
  message:   string;
  timestamp: Date;
  page:      number;
  size:      number;
  total:     number;
  ctl:       CTL[];
}

export interface CTL {
  numeroMovimiento: string;
  numeroCuentaOrigen:   number;
  numeroCuentaDestino:  number;
  monto:            string;
  observacion:      null | string;
  estado:           string;
  fechaCreacion:    Date;
  motivoEstado:     string;
}
