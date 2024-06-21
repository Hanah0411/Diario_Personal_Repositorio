import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Array "mo:base/Array";

actor {
    stable var notes: [Text] = [];

    public query func getNotes(): async [Text] {
        return notes;
    };

    public func addNote(note: Text): async Text {
        notes := Array.append<Text>(notes, [note]);
        return "Nota agregada con éxito";
    };
}

