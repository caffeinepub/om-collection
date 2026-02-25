import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import MixinStorage "blob-storage/Mixin";

actor {
  include MixinStorage();

  type Category = {
    #mensWear;
    #womensWear;
    #kidsWear;
    #ethnicWear;
    #accessories;
  };

  type Product = {
    id : Nat;
    name : Text;
    category : Category;
    price : Nat;
    imageUrl : Text;
    description : Text;
  };

  module Product {
    public func compareByPrice(p1 : Product, p2 : Product) : Order.Order {
      Nat.compare(p1.price, p2.price);
    };

    public func compareByName(p1 : Product, p2 : Product) : Order.Order {
      Text.compare(p1.name, p2.name);
    };
  };

  var nextId = 0;
  let products = Map.empty<Nat, Product>();

  public shared ({ caller }) func addProduct(name : Text, category : Category, price : Nat, imageUrl : Text, description : Text) : async Nat {
    if (name.isEmpty() or imageUrl.isEmpty() or description.isEmpty() or price == 0) {
      Runtime.trap("All fields are required and price must be positive");
    };

    let id = nextId;
    nextId += 1;

    let product : Product = {
      id;
      name;
      category;
      price;
      imageUrl;
      description;
    };

    products.add(id, product);
    id;
  };

  public query ({ caller }) func getProductById(id : Nat) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public query ({ caller }) func getProducts() : async [Product] {
    products.toArray().map(func((_, product)) { product });
  };

  public shared ({ caller }) func updateProduct(id : Nat, name : Text, category : Category, price : Nat, imageUrl : Text, description : Text) : async () {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?existing) {
        let updatedProduct : Product = {
          existing with
          name;
          category;
          price;
          imageUrl;
          description;
        };
        products.add(id, updatedProduct);
      };
    };
  };

  public shared ({ caller }) func deleteProduct(id : Nat) : async () {
    if (not products.containsKey(id)) {
      Runtime.trap("Product not found");
    };
    products.remove(id);
  };

  public query ({ caller }) func getProductsByCategory(category : Category) : async [Product] {
    products.values().toArray().filter(func(product) { product.category == category });
  };

  public query ({ caller }) func getProductsSortedByPrice() : async [Product] {
    products.values().toArray().sort(Product.compareByPrice);
  };

  public query ({ caller }) func getProductsSortedByName() : async [Product] {
    products.values().toArray().sort(Product.compareByName);
  };
};
