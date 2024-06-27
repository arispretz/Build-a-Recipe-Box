
console.clear();

let {
  Alert,
  Button,
  Modal,
  FormControl,
  FormGroup,
  ControlLabel,
  HelpBlock
} = ReactBootstrap;
let recipebox = [
  {
    id: 0,
    category: "Main Courses",
    recipename: "Seasoned Roast  Turkey",
    serves: "15 servings",
    ingredients: "1/4 cup butter melted, 2 teaspoons salt, 2 teaspoons garlic powder, 2 teaspoons seasoned salt, 1-1/2 teaspoons paprika, 1 teaspoon ground ginger, 3/4 teaspoon pepper, 1/2 teaspoon dried basil, 1/4 teaspoon cayenne pepper, 1 turkey (13 to 15 pounds), 2 medium lemons halved, optional",
    method: "Preheat oven to 325°. In a small bowl, combine the first 9 ingredients. Place turkey, breast side up, on a rack in a roasting pan; pat dry. Brush with butter mixture. If desired, place lemons in cavity; tie legs with kitchen twine. Bake, uncovered, 2-3/4 to 3-1/4 hours or until a thermometer inserted in thickest part of thigh reads 170°-175°. Cover loosely with foil if turkey browns too quickly. Cover and let stand 20 minutes before carving.",
  }, {
    id: 1,
    category: "Main Courses",
    recipename: "Traditional Pumpkin Pie",
    serves: "16 servings",
    ingredients: "2 cups all-purpose flour, 3/4 teaspoon salt, 2/3 cup shortening, 4 to 6 tablespoons cold water, 6 large eggs, 1 can (29 ounces) pumpkin, 2 cups packed brown sugar, 2 teaspoons ground cinnamon, 1 teaspoon salt, 1/2 teaspoon each ground cloves, nutmeg and ginger, 2 cups evaporated milk, Dough for single-crust pie, 1 large egg, beaten.",
    method: "Preheat oven to 450°. In a large bowl, combine flour and salt; cut in shortening until crumbly. Gradually add water, tossing with a fork until dough forms a ball. Divide dough in half. On a floured surface, roll out each portion to fit a 9-in. pie plate. Place each crust in a plate; trim crust to 1/2 in. beyond edge of plate. Flute edges. For filling, beat eggs in a large bowl. Add the pumpkin, brown sugar, cinnamon, salt, cloves, nutmeg and ginger; beat just until combined. Gradually stir in milk. Pour into crusts. Bake for 10 minutes. Reduce oven setting to 350°; bake until a knife inserted in the center comes out clean, 40-45 minutes longer. Cool pies on wire racks for 1 hour. Refrigerate at least 3 hours before serving. Refrigerate leftovers. If desired, use additional pie dough and beaten egg to make decorations. For Pumpkins: Roll a small amount of pie dough into a ball; score sides of ball with the blunt side of a knife to create ridges. Place on parchment-lined baking sheet, flatten slightly and insert a whole clove to make the stem. Refrigerate until firm. Brush with beaten egg and bake at 400° until light golden brown and baked through, 15-20 minutes. For Vines: Roll out pie dough to 1/8-in. thickness; cut narrow strips of dough in various lengths. Lay strips on parchment-lined baking sheet and shape into coils as desired. Refrigerate until firm. Brush with beaten egg and bake at 400° until light golden brown, 8-10 minutes. For Leaves: Roll pie dough to 1/8-in. thickness. Cut out leaves using mini leaf-shaped cutters. Using a knife, score leaves to create veins. Refrigerate until firm. Brush with beaten egg and bake at 400° until light golden brown, 8-10 minutes. Arrange baked pumpkins, vines and leaves on surface of chilled pie."
  }, {
    id: 2,
    category: "Main Courses",
    recipename: "Spiced Cranberry Sauce",
    serves: "2 servings",
    ingredients: "1 package (12 ounces) fresh or frozen cranberries, 1-3/4 cups sugar, 1/2 cup water, 1/2 teaspoon ground cinnamon, 1/2 teaspoon ground allspice, 1/8 teaspoon salt, 1/8 teaspoon ground ginger, 1/8 teaspoon ground cloves",
    method: "In a large saucepan, combine all ingredients. Bring to a boil. Reduce heat; simmer, uncovered, until the berries pop and mixture is thickened, about 30 minutes. Cool. Transfer to a serving bowl; cover and refrigerate until chilled.",
  }
];

function storageAvailable(type) {
  try {
    let storage = window[type]
    let x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch(e) {
    return false;
  }
}
if (storageAvailable('localStorage')) {
  if(!localStorage.getItem('_arianaspretz_recipebox')) {
    populateStorage();
  }
} else {
  console.log("No localStorage available.");
}
function populateStorage() {
  localStorage.setItem('_andydlindsay_recipebox', JSON.stringify(recipebox));
}

class Title extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let titleClass = 'text-center heading-text-one';
    let codedByClass = 'text-center heading-text-two';
    return (
      <div>       
        <h1 className={titleClass}>{this.props.title}</h1>
        <h5 className={codedByClass}>Coded by Ariana Spretz - Copyright 2024</h5>
      </div>
    );
  }
}
Title.propTypes = {
  title: React.PropTypes.string
}
Title.defaultProps = {
  title: "Title"
}

class Ingredients extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
   
    const Ingredient = this.props.ingredients.split(',').map((ingredient, id) => {
      return (
        <h5 key={id}>{ingredient}</h5>
      );
    });
    return (
      <div>{Ingredient}</div>
    );
  }
}

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
  }
  updateRecipeProp(propname, event) {
    this.props.recipe[propname] = event.target.value;
    this.props.updateStorage();
    this.forceUpdate();
  }
  render() {
    return (
      <div>
        <form>
          <FieldGroup 
            id="recipename" 
            type="text" 
            label="Recipe Name" 
            onChange={this.updateRecipeProp.bind(this, "recipename")}
            value={this.props.recipe.recipename}
          />
          <FieldGroup 
            id="category" 
            type="text" 
            label="Category" 
            onChange={this.updateRecipeProp.bind(this, "category")}
            value={this.props.recipe.category}
          />
          <FieldGroup 
            id="serves" 
            type="text" 
            label="Serves" 
            onChange={this.updateRecipeProp.bind(this, "serves")}
            value={this.props.recipe.serves}
          />
          <FieldGroup 
            id="ingredients" 
            type="text" 
            componentClass="textarea" 
            label="Ingredients" 
            help="Separate ingredients with a comma." 
            onChange={this.updateRecipeProp.bind(this, "ingredients")}
            value={this.props.recipe.ingredients}
          />
          <FieldGroup 
            id="method" 
            type="text" 
            componentClass="textarea" 
            label="Method" 
            onChange={this.updateRecipeProp.bind(this, "method")}
            value={this.props.recipe.method}
          />
          <FieldGroup 
            id="comment" 
            type="text" 
            label="Comment" 
            onChange={this.updateRecipeProp.bind(this, "comment")}
            value={this.props.recipe.comment}
          />
        </form>
      </div>
    );
  }
}

class NewRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    }
  }
  saveRecipe() {
    if (this.props.recipe.id === undefined) {
      if (this.props.recipe.ingredients !== undefined && this.props.recipe.recipename !== undefined) {
        this.props.recipe.id = Math.floor(Math.random() * 10000);
        this.props.addRecipe(this.props.recipe);
        this.state.message = "";
        this.props.updateStorage();
        this.props.closeModal();
      } else {
        this.state.message = "You must enter a recipe name and at least one ingredient.";
      }
    } else {
      this.props.closeModal();
    }
    console.log(this.state.message);
  }
  render() {
    let recipeName = this.props.recipe.recipename === undefined ? "New Recipe" : this.props.recipe.recipename;
    return (
      <div>
        <Modal show={this.props.show} onHide={() => {this.props.closeModal()}}>
          <Modal.Header closeButton>
            <Modal.Title><b>{ recipeName }</b></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <RecipeForm updateStorage={this.props.updateStorage} recipe={this.props.recipe}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => { this.saveRecipe() }} bsStyle="primary">Save</Button>
          </Modal.Footer>
        </Modal>
    </div>
    );
  }
}

class RecipeBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipebox: JSON.parse(localStorage.getItem('_andydlindsay_recipebox')),
      showModal: false,
      activeRecipe: {}
    }
  }
  deleteRecipe(id) {
    let remainingItems = this.state.recipebox.filter(function(el) {
      return id !== el.id;
    });
    this.setState({
      recipebox: remainingItems
    });
    localStorage.setItem('_andydlindsay_recipebox', JSON.stringify(remainingItems));
  }
  addRecipe(recipe) {
    this.state.recipebox.push(recipe)
  }
  closeModal() {
    this.setState({
      showModal: false
    });
  }
  openModal(activeRecipe) {
    this.setState({
      showModal: true,
      activeRecipe
    });
  }
  updateStorage() {
    localStorage.setItem('_andydlindsay_recipebox', JSON.stringify(this.state.recipebox));
  }
  render() {
    const RecipeComponents = this.state.recipebox.map((recipe, id) => {
      return (
        <div key={recipe.id} className="panel panel-default">
          <div className="panel-heading">
            <h2 className="panel-title">
              <a data-toggle="collapse" data-parent="#accordion" href={'#collapse' + id}>{recipe.recipename}</a>
            </h2>
          </div>
          <div id={'collapse' + id} className="panel-collapse collapse">
            <div className="panel-body">
              <h4 className="float-left">Category: {recipe.category}</h4>
              <h4 className="float-right comment-text text-right">{recipe.comment}</h4>
              <h4 className="clear-left">Serves: {recipe.serves}</h4>
              <Ingredients ingredients={recipe.ingredients} />
              <h4>{recipe.method}</h4>
              <Button bsStyle="primary" onClick={() => {this.openModal(recipe)}}>Edit Recipe</Button>
              <button type="button" onClick={() => { this.deleteRecipe(recipe.id) }} className="btn btn-warning">Delete Recipe</button>
            </div>
          </div>
        </div>
      );
    }, this);
    return (
      <div className="recipe-text">
        <div id="accordion" className="panel-group rounded-corners">
          {RecipeComponents}
        </div>
        <div>
          <Button bsStyle="primary" onClick={() => {this.openModal({})}}>Add Recipe</Button>
        </div>
        <NewRecipe show={this.state.showModal} recipe={this.state.activeRecipe} updateStorage={this.updateStorage.bind(this)} addRecipe={this.addRecipe.bind(this)} closeModal={this.closeModal.bind(this)} />
      </div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
        <Title title="Recipe Box"/>
        <div id="accordion rounded-corners">
          <RecipeBox />
        </div>
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('app'));
