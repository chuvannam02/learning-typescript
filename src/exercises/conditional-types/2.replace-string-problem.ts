// Problem

type ReplaceSpaceWithDash = unknown;
type Name = ReplaceSpaceWithDash<"Emmylou Harris">;
// Expected Output:  ^? "Emmylou-Harris"

type Replace = unknown;
type DashName = Replace<"Matt Pocock", " ", "-">;
// Expected Output:   ^? "Matt-Pocock"

type StringReplace = unknown;
type Result = StringReplace<"Evondev Frontend Dev", " ", "-">;
// Expected Output:  ^? "Evondev-Frontend-Dev"