type User = {
  city?: string;
  displayName: Include<import('firebase/auth').User['displayName'], string>;
  email: Include<import('firebase/auth').User['email'], string>;
  phoneNumber: import('firebase/auth').User['phoneNumber'];
  photoURL: import('firebase/auth').User['photoURL'];
  uid: import('firebase/auth').User['uid'];
  pokemons: {
    name: Pokemon['name'];
    id: Pokemon['id'];
    image: Pokemon['sprites']['front_default'];
  }[];
};

interface UserDocument extends User {}

interface PokemonDocument {
  uid: User['uid'];
  name: Pokemon['name'];
  id: Pokemon['id'];
}

/**
 * The name and the URL of the referenced resource
 */
interface NamedAPIResource {
  /** The name of the referenced resource */
  name: string;
  /** The URL of the referenced resource */
  url: string;
}

/**
 * Calling any API endpoint without a resource ID or name will return a paginated list of available resources for that API.
 * By default, a list "page" will contain up to 20 resources. If you would like to change this just add a 'limit' query parameter
 * to the GET request, e.g. ?=60. You can use 'offset' to move to the next page, e.g. ?limit=60&offset=60
 */
interface NamedAPIResourceList {
  /** The total number of resources available from this API */
  count: number;
  /** The URL for the next page in the list */
  next: string | null;
  /** The URL for the previous page in the list */
  previous: string | null;
  /** A list of named API resources */
  results: NamedAPIResource[];
}

/** An URL for another resource in the API */
interface APIResource {
  /** The URL of the referenced resource */
  url: string;
}

interface Pokemon {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** The base experience gained for defeating this Pokémon */
  base_experience: number;
  /** The height of this Pokémon in decimetres */
  height: number;
  /** Set for exactly one Pokémon used as the default for each species */
  is_default: boolean;
  /** Order for sorting. Almost national order, except families are grouped together */
  order: number;
  /** The weight of this Pokémon in hectograms */
  weight: number;
  /** A list of abilities this Pokémon could potentially have */
  abilities: PokemonAbility[];
  /** A list of forms this Pokémon can take on */
  forms: NamedAPIResource[];
  /** A list of game indices relevent to Pokémon item by generation */
  game_indices: VersionGameIndex[];
  /** A list of items this Pokémon may be holding when encountered */
  held_items: PokemonHeldItem[];
  /** A link to a list of location areas, as well as encounter details pertaining to specific versions */
  location_area_encounters: string;
  /** A list of moves along with learn methods and level details pertaining to specific version groups */
  moves: PokemonMove[];
  /** A set of sprites used to depict this Pokémon in the game.
   * A visual representation of the various sprites can be found at [PokeAPI/sprites](https://github.com/PokeAPI/sprites#sprites)
   */
  sprites: PokemonSprites;
  /** The species this Pokémon belongs to */
  species: NamedAPIResource;
  /** A list of base stat values for this Pokémon */
  stats: PokemonStat[];
  /** A list of details showing types this Pokémon has */
  types: PokemonType[];
  /** Data describing a Pokemon's types in a previous generation. */
  past_types: PokemonPastType[];
}

/**
 * Abilities the given pokémon could potentially have
 */
interface PokemonAbility {
  /** Whether or not this is a hidden ability */
  is_hidden: boolean;
  /** The slot this ability occupies in this Pokémon species */
  slot: number;
  /** The ability the Pokémon may have */
  ability: NamedAPIResource;
}

/**
 * Details showing types the given Pokémon has
 */
interface PokemonType {
  /** The order the Pokémon's types are listed in */
  slot: number;
  /** The type the referenced Pokémon has */
  type: NamedAPIResource;
}

/**
 * Data describing a Pokemon's types in a previous generation.
 */
interface PokemonPastType {
  /** The generation of this Pokémon Type. */
  generation: NamedAPIResource;
  /** Types this of this Pokémon in a previos generation. */
  types: PokemonType[];
}

/**
 * Items the given Pokémon may be holding when encountered
 */
interface PokemonHeldItem {
  /** The item the referenced Pokémon holds */
  item: NamedAPIResource;
  /** The details of the different versions in which the item is held */
  version_details: PokemonHeldItemVersion[];
}

/**
 * The details of the different versions in which the item is held
 */
interface PokemonHeldItemVersion {
  /** The version in which the item is held */
  version: NamedAPIResource;
  /** How often the item is held */
  rarity: number;
}

/**
 * A Move along with learn methods and level details pertaining to specific version groups
 */
interface PokemonMove {
  /** The move the Pokémon can learn */
  move: NamedAPIResource;
  /** The details of the version in which the Pokémon can learn the move */
  version_group_details: PokemonMoveVersion[];
}

/**
 * The details of the version in which the Pokémon can learn the move
 */
interface PokemonMoveVersion {
  /** The method by which the move is learned */
  move_learn_method: NamedAPIResource;
  /** The version group in which the move is learned */
  version_group: NamedAPIResource;
  /** The minimum level to learn the move */
  level_learned_at: number;
}

/**
 * Base stat values for the given Pokémon
 */
interface PokemonStat {
  /** The stat the Pokémon has */
  stat: NamedAPIResource;
  /** The effort points (EV) the Pokémon has in the stat */
  effort: number;
  /** The base value of the stat */
  base_stat: number;
}

/** Version Sprites */
interface VersionSprites {
  /** Generation-I Sprites of this Pokémon */
  'generation-i': GenerationISprites;
  /** Generation-II Sprites of this Pokémon */
  'generation-ii': GenerationIISprites;
  /** Generation-III Sprites of this Pokémon */
  'generation-iii': GenerationIIISprites;
  /** Generation-IV Sprites of this Pokémon */
  'generation-iv': GenerationIVSprites;
  /** Generation-V Sprites of this Pokémon */
  'generation-v': GenerationVSprites;
  /** Generation-VI Sprites of this Pokémon */
  'generation-vi': GenerationVISprites;
  /** Generation-VII Sprites of this Pokémon */
  'generation-vii': GenerationVIISprites;
  /** Generation-VIII Sprites of this Pokémon */
  'generation-viii': GenerationVIIISprites;
}

/**
 * A set of sprites used to depict this Pokémon in the game.
 * A visual representation of the various sprites can be found at [PokeAPI/sprites](https://github.com/PokeAPI/sprites#sprites)
 */
interface PokemonSprites {
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
  /** The shiny female depiction of this Pokémon from the front in battle */
  front_shiny_female: string | null;
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string | null;
  /** The female depiction of this Pokémon from the back in battle */
  back_female: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  back_shiny_female: string | null;
  /** Dream World, Official Artwork and Home sprites */
  other: OtherPokemonSprites;
  /** Version Sprites of this Pokémon */
  versions: VersionSprites;
}

/** Other Pokemon Sprites (Dream World and Official Artwork sprites) */
interface OtherPokemonSprites {
  /** Dream World Sprites of this Pokémon */
  dream_world: DreamWorld;
  /** Official Artwork Sprites of this Pokémon */
  'official-artwork': OfficialArtwork;
  /** Home Artwork Sprites of this Pokémon */
  home: Home;
}

/** Dream World sprites */
interface DreamWorld {
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
}

/** Official Artwork sprites */
interface OfficialArtwork {
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
}

/** Home sprites */
interface Home {
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  front_shiny_female: string | null;
}

/** Generation-I Srites */
interface GenerationISprites {
  /** Red-blue sprites of this Pokémon */
  'red-blue': RedBlue;
  /** Yellow sprites of this Pokémon  */
  yellow: Yellow;
}

/** Red/Blue Sprites */
interface RedBlue {
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The gray depiction of this Pokémon from the back in battle */
  back_gray: string | null;
  /** The transparent depiction of this Pokémon from the back in battle */
  back_transparent: string | null;
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The gray depiction of this Pokémon from the front in battle */
  front_gray: string | null;
  /** The transparent depiction of this Pokémon from the front in battle */
  front_transparent: string | null;
}

/** Yellow sprites */
interface Yellow {
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The gray depiction of this Pokémon from the back in battle */
  back_gray: string | null;
  /** The transparent depiction of this Pokémon from the back in battle */
  back_transparent: string | null;
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The gray depiction of this Pokémon from the front in battle */
  front_gray: string | null;
  /** The transparent depiction of this Pokémon from the front in battle */
  front_transparent: string | null;
}

/** Generation-II Sprites */
interface GenerationIISprites {
  /** Crystal sprites of this Pokémon */
  crystal: Crystal;
  /** Gold sprites of this Pokémon */
  gold: Gold;
  /** Silver sprites of this Pokémon */
  silver: Silver;
}

/** Crystal sprites */
interface Crystal {
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string | null;
  /** The back shiny transparent depiction of this Pokémon from the back in battle */
  back_shiny_transparent: string | null;
  /** The transparent depiction of this Pokémon from the back in battle */
  back_transparent: string | null;
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The front shiny transparent depiction of this Pokémon from the front in battle */
  front_shiny_transparent: string | null;
  /** The transparent depiction of this Pokémon from the front in battle */
  front_transparent: string | null;
}

interface Gold {
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string | null;
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The transparent depiction of this Pokémon from the front in battle */
  front_transparent: string | null;
}

/** Silver sprites */
interface Silver {
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string | null;
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The transparent depiction of this Pokémon from the front in battle */
  front_transparent: string | null;
}

/** Generation-III Sprites */
interface GenerationIIISprites {
  /** Emerald sprites of this Pokémon */
  emerald: Emerald;
  /** Firered-Leafgreen sprites of this Pokémon */
  'firered-leafgreen': FireredLeafgreen;
  /** Ruby-Sapphire sprites of this Pokémon */
  'ruby-sapphire': RubySapphire;
}

/** Emerald sprites */
interface Emerald {
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
}

/** FireRead LeafGreen sprites  */
interface FireredLeafgreen {
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string | null;
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
}

/** Ruby/Sapphire sprites */
interface RubySapphire {
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string | null;
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
}

/** Generation-IV Sprites */
interface GenerationIVSprites {
  /** Diamond-pearl Generation sprites of this Pokémon */
  'diamond-pearl': DiamondPearl;
  /** Heartgold-Soulsilver sprites of this Pokémon */
  'heartgold-soulsilver': HeartgoldSoulsilver;
  /** Platinum sprites of this Pokémon */
  platinum: Platinum;
}

interface DiamondPearl {
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string | null;
  /** The female depiction of this Pokémon from the back in battle */
  back_female: string | null;
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  back_shiny_female: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  front_shiny_female: string | null;
}

interface HeartgoldSoulsilver {
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string | null;
  /** The female depiction of this Pokémon from the back in battle */
  back_female: string | null;
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  back_shiny_female: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  front_shiny_female: string | null;
}

interface Platinum {
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string | null;
  /** The female depiction of this Pokémon from the back in battle */
  back_female: string | null;
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  back_shiny_female: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  front_shiny_female: string | null;
}

/** Generation-V Sprites */
interface GenerationVSprites {
  /** Black-white sprites of this Pokémon */
  'black-white': BlackWhite;
}

/** Black/White sprites */
interface BlackWhite {
  /** The animated sprite of this pokémon */
  animated: Animated;
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string | null;
  /** The female depiction of this Pokémon from the back in battle */
  back_female: string | null;
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  back_shiny_female: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  front_shiny_female: string | null;
}
interface Animated {
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string | null;
  /** The female depiction of this Pokémon from the back in battle */
  back_female: string | null;
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  back_shiny_female: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  front_shiny_female: string | null;
}

/** Generation-VI Sprites */
interface GenerationVISprites {
  /** Omegaruby-Alphasapphire sprites of this Pokémon */
  'omegaruby-alphasapphire': OmegarubyAlphasapphire;
  /** X-Y sprites of this Pokémon */
  'x-y': XY;
}

/** Omega/Ruby Alpha/Sapphire sprites */
interface OmegarubyAlphasapphire {
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  front_shiny_female: string | null;
}

/** XY sprites */
interface XY {
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  front_shiny_female: string | null;
}

/** Generation-VII Sprites */
interface GenerationVIISprites {
  /** Icon sprites of this Pokémon */
  icons: GenerationViiIcons;
  /** Ultra-sun-ultra-moon sprites of this Pokémon */
  'ultra-sun-ultra-moon': UltraSunUltraMoon;
}

/** Generation VII icons */
interface GenerationViiIcons {
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
}

/** Ultra Sun Ultra Moon sprites */
interface UltraSunUltraMoon {
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  front_shiny_female: string | null;
}

/** Generation-VIII Sprites */
interface GenerationVIIISprites {
  /** Icon sprites of this Pokémon */
  icons: GenerationViiiIcons;
}

/** Generation VIII icons */
interface GenerationViiiIcons {
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
}

/**
 * ## Location Area Encounter
 * Pokémon location areas where Pokémon can be found
 */
interface LocationAreaEncounter {
  /** The location area the referenced Pokémon can be encountered in */
  location_area: NamedAPIResource;
  /** A list of versions and encounters with the referenced Pokémon that might happen */
  version_details: VersionEncounterDetail[];
}

/**
 * ## Pokemon Colors
 * Colors used for sorting Pokémon in a Pokédex.
 * The color listed in the Pokédex is usually the color most apparent or covering each Pokémon's body.
 * No orange category exists; Pokémon that are primarily orange are listed as red or brown.
 */
interface PokemonColor {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name:
    | 'black'
    | 'blue'
    | 'brown'
    | 'gray'
    | 'green'
    | 'pink'
    | 'purple'
    | 'red'
    | 'white'
    | 'yellow';
  /** The name of this resource listed in different languages */
  names: Name[];
  /** A list of the Pokémon species that have this color */
  pokemon_species: NamedAPIResource[];
}

/**
 * ## Pokemon Form
 * Some Pokémon may appear in one of multiple, visually different forms.
 * These differences are purely cosmetic. For variations within a Pokémon species,
 * which do differ in more than just visuals, the 'Pokémon' entity is used to represent such a variety.
 */
interface PokemonForm {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** The order in which forms should be sorted within all forms.
   * Multiple forms may have equal order, in which case they should fall back on sorting by name
   */
  order: number;
  /** The order in which forms should be sorted within a species' forms */
  form_order: number;
  /** True for exactly one form used as the default for each Pokémon */
  is_default: boolean;
  /** Whether or not this form can only happen during battle */
  is_battle_only: boolean;
  /** Whether or not this form requires mega evolution */
  is_mega: boolean;
  /** The name of this form */
  form_name: string;
  /** The Pokémon that can take on this form */
  pokemon: NamedAPIResource;
  /** A set of sprites used to depict this Pokémon form in the game */
  sprites: PokemonFormSprites;
  /** The version group this Pokémon form was introduced in */
  version_group: NamedAPIResource;
  /** The form specific full name of this Pokémon form, or empty if the form does not have a specific name */
  names: Name[];
  /** The form specific form name of this Pokémon form, or empty if the form does not have a specific name */
  form_names: Name[];
  /** A list of details showing types this Pokémon has */
  types: PokemonType[];
}

/**
 * Sprites used to depict this Pokémon form in the game
 */
interface PokemonFormSprites {
  /** The default depiction of this Pokémon form from the front in battle */
  front_default: string | null;
  /** The female depiction of this Pokémon form from the front in battle */
  front_female: string | null;
  /** The shiny depiction of this Pokémon form from the front in battle */
  front_shiny: string | null;
  /** The shiny female depiction of this Pokémon form from the front in battle */
  front_shiny_female: string | null;
  /** The default depiction of this Pokémon form from the back in battle */
  back_default: string | null;
  /** The female depiction of this Pokémon form from the back in battle */
  back_female: string | null;
  /** The shiny depiction of this Pokémon form from the back in battle */
  back_shiny: string | null;
  /** The shiny female depiction of this Pokémon form from the back in battle */
  back_shiny_female: string | null;
}

/**
 * ## Pokemon Habitat
 * Habitats are generally different terrain Pokémon can be found in
 * but can also be areas designated for rare or legendary Pokémon
 */
interface PokemonHabitat {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name:
    | 'cave'
    | 'forest'
    | 'grassland'
    | 'mountain'
    | 'rare'
    | 'rough-terrain'
    | 'sea'
    | 'urban'
    | 'waters-edge';
  /** The name of this resource listed in different languages */
  names: Name[];
  /** A list of the Pokémon species that can be found in this habitat */
  pokemon_species: NamedAPIResource[];
}

/**
 * ## Pokemon Shape
 * Shapes used for sorting Pokémon in a Pokédex
 */
interface PokemonShape {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** The "scientific" name of this Pokémon shape listed in different languages */
  awesome_names: AwesomeName[];
  /** The name of this resource listed in different languages */
  names: Name[];
  /** A list of the Pokémon species that have this shape */
  pokemon_species: NamedAPIResource[];
}

/**
 * The "scientific" name of the Pokémon shape listed in different languages
 */
interface AwesomeName {
  /** The localized "scientific" name for an API resource in a specific language */
  awesome_name: string;
  /** The language this "scientific" name is in */
  language: NamedAPIResource;
}

/**
 * ## Pokemon Species
 * A Pokémon Species forms the basis for at least one Pokémon.
 * Attributes of a Pokémon species are shared across all varieties of Pokémon within the species.
 * A good example is Wormadam; Wormadam is the species which can be found in three different varieties,
 * Wormadam-Trash, Wormadam-Sandy and Wormadam-Plant */
interface PokemonSpecies {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** The order in which species should be sorted. Based on National Dex order, except families are grouped together and sorted by stage */
  order: number;
  /** The chance of this Pokémon being female, in eighths; or -1 for genderless */
  gender_rate: number;
  /** The base capture rate; up to 255. The higher the number, the easier the catch */
  capture_rate: number;
  /** The happiness when caught by a normal Pokéball; up to 255. The higher the number, the happier the Pokémon */
  base_happiness: number;
  /** Whether or not this is a baby Pokémon */
  is_baby: boolean;
  /** Whether or not this is a legendary Pokémon */
  is_legendary: boolean;
  /** Whether or not this is a mythical Pokémon */
  is_mythical: boolean;
  /** Initial hatch counter: one must walk 255 × (hatch_counter + 1) steps before this Pokémon's egg hatches, unless utilizing bonuses like Flame Body's */
  hatch_counter: number;
  /** Whether or not this Pokémon has visual gender differences */
  has_gender_differences: boolean;
  /** Whether or not this Pokémon has multiple forms and can switch between them */
  forms_switchable: boolean;
  /** The rate at which this Pokémon species gains levels */
  growth_rate: NamedAPIResource;
  /** A list of Pokedexes and the indexes reserved within them for this Pokémon species */
  pokedex_numbers: PokemonSpeciesDexEntry[];
  /** A list of egg groups this Pokémon species is a member of */
  egg_groups: NamedAPIResource[];
  /** The color of this Pokémon for Pokédex search */
  color: NamedAPIResource;
  /** The shape of this Pokémon for Pokédex search */
  shape: NamedAPIResource;
  /** The Pokémon species that evolves into this Pokemon_species */
  evolves_from_species: NamedAPIResource;
  /** The evolution chain this Pokémon species is a member of */
  evolution_chain: APIResource;
  /** The habitat this Pokémon species can be encountered in */
  habitat: NamedAPIResource;
  /** The generation this Pokémon species was introduced in */
  generation: NamedAPIResource;
  /** The name of this resource listed in different languages */
  names: Name[];
  /** A list of encounters that can be had with this Pokémon species in pal park */
  pal_park_encounters: PalParkEncounterArea[];
  /** A list of flavor text entries for this Pokémon species */
  flavor_text_entries: FlavorText[];
  /** Descriptions of different forms Pokémon take on within the Pokémon species */
  form_descriptions: Description[];
  /** The genus of this Pokémon species listed in multiple languages */
  genera: Genus[];
  /** A list of the Pokémon that exist within this Pokémon species */
  varieties: PokemonSpeciesVariety[];
}

/**
 * The genus of the given Pokémon species listed in multiple languages
 */
interface Genus {
  /** The localized genus for the referenced Pokémon species */
  genus: string;
  /** The language this genus is in */
  language: NamedAPIResource;
}

/** Pokedexes and the indexes reserved within them for the given Pokémon species */
interface PokemonSpeciesDexEntry {
  /** The index number within the Pokédex */
  entry_number: number;
  /** The Pokédex the referenced Pokémon species can be found in */
  pokedex: NamedAPIResource;
}

/**
 * Encounter that can be had with the given Pokémon species in pal park
 */
interface PalParkEncounterArea {
  /** The base score given to the player when the referenced Pokémon is caught during a pal park run */
  base_score: number;
  /** The base rate for encountering the referenced Pokémon in this pal park area */
  rate: number;
  /** The pal park area where this encounter happens */
  area: NamedAPIResource;
}

/**
 * Pokémons that exist within this Pokémon species
 */
interface PokemonSpeciesVariety {
  /** Whether this variety is the default variety */
  is_default: boolean;
  /** The Pokémon variety */
  pokemon: NamedAPIResource;
}

/**
 * Evolution Detail
 * All details regarding the specific details of the referenced Pokémon species evolution.
 */
interface EvolutionDetail {
  /** The item required to cause evolution this into Pokémon species. */
  item: NamedAPIResource | null;
  /** The type of event that triggers evolution into this Pokémon species. */
  trigger: NamedAPIResource;
  /** The id of the gender of the evolving Pokémon species must be in order to evolve into this Pokémon species. */
  gender: number | null;
  /** The item the evolving Pokémon species must be holding during the evolution trigger event to evolve into this Pokémon species. */
  held_item: NamedAPIResource | null;
  /** The move that must be known by the evolving Pokémon species during the evolution trigger event in order to evolve into this Pokémon species. */
  known_move: NamedAPIResource | null;
  /** The evolving Pokémon species must know a move with this type during the evolution trigger event in order to evolve into this Pokémon species. */
  known_move_type: NamedAPIResource | null;
  /** The location the evolution must be triggered at. */
  location: NamedAPIResource | null;
  /** The minimum required level of the evolving Pokémon species to evolve into this Pokémon species. */
  min_level: number | null;
  /** The minimum required level of happiness the evolving Pokémon species to evolve into this Pokémon species. */
  min_happiness: number | null;
  /** The minimum required level of beauty the evolving Pokémon species to evolve into this Pokémon species. */
  min_beauty: number | null;
  /** The minimum required level of affection the evolving Pokémon species to evolve into this Pokémon species. */
  min_affection: number | null;
  /** Whether or not it must be raining in the overworld to cause evolution this Pokémon species. */
  needs_overworld_rain: boolean;
  /** The Pokémon species that must be in the players party in order for the evolving Pokémon species to evolve into this Pokémon species. */
  party_species: NamedAPIResource | null;
  /**
   * The player must have a Pokémon of this type in their party during the evolution trigger event
   * in order for the evolving Pokémon species to evolve into this Pokémon species.
   */
  party_type: NamedAPIResource | null;
  /** The required relation between the Pokémon's Attack and Defense stats. 1 means Attack > Defense. 0 means Attack = Defense. -1 means Attack < Defense. */
  relative_physical_stats: 1 | 0 | -1 | null;
  /** The required time of day. Day or night. */
  time_of_day: 'Day' | 'Night' | '';
  /** Pokémon species for which this one must be traded. */
  trade_species: NamedAPIResource | null;
  /** Whether or not the 3DS needs to be turned upside-down as this Pokémon levels up. */
  turn_upside_down: boolean;
}

/**
 * ## Chain Link
 * Contains evolution details for a Pokémon in the chain.
 * Each link references the next Pokémon in the natural evolution order
 */
interface ChainLink {
  /** Whether or not this link is for a baby Pokémon. This would only ever be true on the base link */
  is_baby: boolean;
  /** The Pokémon species at this point in the evolution chain */
  species: NamedAPIResource;
  /** All details regarding the specific details of the referenced Pokémon species evolution */
  evolution_details: EvolutionDetail[];
  /** A List of chain objects */
  evolves_to: ChainLink[];
}

/**
 * ## Evolution Chain
 * Evolution chains are essentially family trees.
 * They start with the lowest stage within a family and detail
 * evolution conditions for each as well as Pokémon they can evolve
 * into up through the hierarchy.
 */
interface EvolutionChain {
  /** The identifier for this resource */
  id: number;
  /**
   * The item that a Pokémon would be holding when mating that would trigger
   * the egg hatching a baby Pokémon rather than a basic Pokémon
   */
  baby_trigger_item: NamedAPIResource | null;
  /**
   * The base chain link object. Each link contains evolution details for a Pokémon in the chain.
   * Each link references the next Pokémon in the natural evolution order
   */
  chain: ChainLink;
}

/**
 * ## Evolution Trigger
 * Evolution triggers are the events and conditions that cause a Pokémon to evolve.
 * There are numerous methods of evolution which define how and when Pokémon evolve.
 * Most Pokémon will evolve by leveling up while others evolve through specific means,
 * such as being traded, achieving a certain amount of friendship or leveling at certain times, among others.
 * - Check out [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Methods_of_evolution) for greater detail.
 */
interface EvolutionTrigger {
  /** The identifier for this resource. */
  id: number;
  /** The name for this resource. */
  name: 'level-up' | 'trade' | 'use-item' | 'shed' | 'other';
  /** The name of this resource listed in different languages. */
  names: Name[];
  /** A list of pokemon species that result from this evolution trigger. */
  pokemon_species: NamedAPIResource[];
}
