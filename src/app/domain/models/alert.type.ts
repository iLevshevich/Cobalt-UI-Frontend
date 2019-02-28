export enum AlertType {
  Success,
  Error,
  Info,
  Warning
}

export namespace AlertType {
  export function getCssClass(type: AlertType): string {
    switch (type) {
      case AlertType.Success:
        return 'alert-success';
      case AlertType.Error:
        return 'alert-danger';
      case AlertType.Info:
        return 'alert-info';
      case AlertType.Warning:
        return 'alert-warning';
    }
  }

  export function getIconClass(type: AlertType): string {
    switch (type) {
      case AlertType.Success:
        return 'fa-check-double';
      case AlertType.Error:
        return 'fa-exclamation';
      case AlertType.Info:
        return 'fa-info';
      case AlertType.Warning:
        return 'fa-exclamation';
    }
  }

  export function getMessageType(type: AlertType): string {
    switch (type) {
      case AlertType.Success:
        return 'Success';
      case AlertType.Error:
        return 'Error';
      case AlertType.Info:
        return 'Info';
      case AlertType.Warning:
        return 'Warning';
    }
  }
}
