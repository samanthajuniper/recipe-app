var _ = require('lodash');
const Recipe = require('../models/recipes');
const Category = require('../models/categories');

const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList
 } = graphql;

//dummy data

// let categories=[
//     {id:'1', category:'vegetarian'},
//     {id:'2', category:'vegan'},
//     {id:'3', category:'lunch'}
// ];

// let recipes=[
//     {id:'1', name:'pancakes', link:'https://www.allrecipes.com/recipe/21014/good-old-fashioned-pancakes/', categoryId :'1'},
//     {id:'2', name:'baked potatoes', link:'https://www.spendwithpennies.com/perfect-baked-potatoes/', categoryId:'2'},
//     {id:'3', name:'pb&j', link:'https://www.allrecipes.com/recipe/49943/grilled-peanut-butter-and-jelly-sandwich/', categoryId:'3'},
//     {id:'4', name:'egg casserole', link:'https://www.allrecipes.com/recipe/21014/good-old-fashioned-pancakes/', categoryId :'1'},
//     {id:'4', name:'mushroom stroganauf', link:'https://www.allrecipes.com/recipe/21014/good-old-fashioned-pancakes/', categoryId :'1'}
// ];

const RecipeType = new GraphQLObjectType({
    name: 'Recipe',
    fields: () => ({
        id: { type:GraphQLID },
        name: { type:GraphQLString },
        link: { type:GraphQLString },
        category: {
            type: CategoryType,
            resolve(parent, args){
                return Recipe.findById('parent.categoryId')

            }
        },
    })
});

const CategoryType = new GraphQLObjectType({
    name: 'Category',
    fields: () => ({
        id: { type:GraphQLID},
        categoryName: { type:GraphQLString },
        recipes: {
            type: new GraphQLList(RecipeType),
            resolve(parent, args){
                return Recipe.find({categoryId:parent.id})
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        recipe: {
            type: RecipeType,
            args: { id: { type:GraphQLID } },
            resolve(parent, args){
                //find by the ID given by the user
                return Recipe.findById(args.id)
            }
        },
        category: {
            type: CategoryType,
            args: { id: { type:GraphQLID } },
            resolve(parent, args){
                //find by the ID given by the user
                return Category.findById(args.id)
            }
        },
        recipes: {
            type: new GraphQLList(RecipeType),
            resolve(parent, args){
                return Recipe.find({})
            }
        },
        categories: {
            type: new GraphQLList(CategoryType),
            resolve(parent, args){
                return Category.find({})
            }
        }

    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addRecipe: {
            type: RecipeType,
            args: {
                name:{type: GraphQLString},
                link:{type: GraphQLString},
                categoryId:{type: GraphQLID}
            },
            resolve(parent,args){
                let recipe = new Recipe({
                    name: args.name,
                    link: args.link,
                    categoryId: args.categoryId
                });
                return recipe.save();
            }
        },
        addCategory: {
            type: CategoryType,
            args:{
                category:{type: GraphQLString},
                // recipes
            },
            resolve(parent, args){
                let category = new Category({
                    categoryName: args.category
                });
                return category.save();
            }
        }

    },

})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});