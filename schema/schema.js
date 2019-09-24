var _ = require('lodash');

const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID
 } = graphql;

//dummy data

let recipes=[
    {id:'1', name:'pancakes', link:'https://www.allrecipes.com/recipe/21014/good-old-fashioned-pancakes/', category: 'vegetarian'},
    {id:'2', name:'baked potatoes', link:'https://www.spendwithpennies.com/perfect-baked-potatoes/', category: 'vegan'},
    {id:'3', name:'pb&j', link:'https://www.allrecipes.com/recipe/49943/grilled-peanut-butter-and-jelly-sandwich/', category: 'lunch'}
];

let categories=[
    {id:'1', type:'vegetarian'},
    {id:'2', type:'vegan'},
    {id:'3', type:'lunch'}
];


const RecipeType = new GraphQLObjectType({
    name: 'Recipe',
    fields: () => ({
        id: { type:GraphQLID},
        name: { type:GraphQLString },
        link: { type:GraphQLString },
        category: { type:GraphQLString },
    })
});

const CategoryType = new GraphQLObjectType({
    name: 'Category',
    fields: () => ({
        id: { type:GraphQLID},
        type: { type:GraphQLString },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        recipe: {
            type: RecipeType,
            args: { id: { type:GraphQLID } },
            resolve(parent, args){
                return _.find(recipes,{id:args.id});
            }
        },
        category: {
            type: CategoryType,
            args: { id: { type:GraphQLID } },
            resolve(parent, args){
                return _.find(categories,{id:args.id});
            }


        }

    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});