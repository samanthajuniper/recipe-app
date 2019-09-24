var _ = require('lodash');

const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

//dummy data

let recipes=[
    {id:'1', name:'pancakes', link:'https://www.allrecipes.com/recipe/21014/good-old-fashioned-pancakes/', category: 'breakfast'},
    {id:'2', name:'baked potatoes', link:'https://www.spendwithpennies.com/perfect-baked-potatoes/', category: 'dinner'},
    {id:'3', name:'pb&j', link:'https://www.allrecipes.com/recipe/49943/grilled-peanut-butter-and-jelly-sandwich/', category: 'lunch '}
];


const RecipeType = new GraphQLObjectType({
    name: 'Recipe',
    fields: () => ({
        id: { type:GraphQLString },
        name: { type:GraphQLString },
        link: { type:GraphQLString },
        category: { type:GraphQLString },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        recipe: {
            type: RecipeType,
            args: { id: { type:GraphQLString } },
            resolve(parent, args){
                //code to get data from db/other source
                return _.find(recipes,{id:args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});