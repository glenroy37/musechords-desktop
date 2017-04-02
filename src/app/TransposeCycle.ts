/**
 * Created by mathias on 02/04/2017.
 */
export default class TransposeCycle{
  public static cycleUp: Object = {
    "C": "C#",
    "C#": "D",
    "D": "D#",
    "D#": "E",
    "E": "F",
    "F": "F#",
    "F#": "G",
    "G": "G#",
    "G#": "A",
    "A": "A#",
    "A#": "B",
    "B": "C",
  };
  public static cycleDown: Object = {
    "C":"B",
    "Db": "C",
    "D":"Db",
    "Eb":"D",
    "E":"Eb",
    "F":"E",
    "Gb":"F",
    "G":"Gb",
    "Ab":"G",
    "A":"Ab",
    "Bb":"A",
    "B":"Bb"
  };

  public static enharmonicEquivalents: Object = {
    "C#": "Db",
    "Db": "C#",
    "D#": "Eb",
    "Eb": "D#",
    "F#": "Gb",
    "Gb": "F#",
    "G#": "Ab",
    "Ab": "G#",
    "A#": "Bb",
    "Bb": "A#"
  };
}
