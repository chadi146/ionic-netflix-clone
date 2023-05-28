/**
 * This class is used to add all the track by methods that are used globally in the app.
 * ? usage: extend this class in the component / page you want to use it in, provide a type and use any method defined here
 */
export class TrackByHelper {
  trackByIdentity(index: number, item: any & { id: number | string }) {
    return item.id;
  }
}
