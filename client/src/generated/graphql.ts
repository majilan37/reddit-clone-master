import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Comment = {
  __typename?: 'Comment';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  post: Post;
  postId: Scalars['String'];
  text: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type CreateCommentInput = {
  postId: Scalars['String'];
  text: Scalars['String'];
};

export type CreatePostInput = {
  body: Scalars['String'];
  image?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  topic: Scalars['String'];
};

export type CreateSubredditInput = {
  topic: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type DeleteVoteInput = {
  _id: Scalars['String'];
};

export type GetPostInput = {
  _id: Scalars['String'];
};

export type GetSubredditByTopic = {
  topic: Scalars['String'];
};

export type GetVoteForPost = {
  postId: Scalars['String'];
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
  createPost: Post;
  createSubreddit: Subreddit;
  deleteVote?: Maybe<Vote>;
  login: User;
  register: User;
  setUpVote: Vote;
};


export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationCreateSubredditArgs = {
  input: CreateSubredditInput;
};


export type MutationDeleteVoteArgs = {
  input: DeleteVoteInput;
};


export type MutationLoginArgs = {
  data: LoginUserInput;
};


export type MutationRegisterArgs = {
  data: CreateUserInput;
};


export type MutationSetUpVoteArgs = {
  input: VoteInput;
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['String'];
  body: Scalars['String'];
  comments: Array<Comment>;
  createdAt: Scalars['DateTime'];
  image?: Maybe<Scalars['String']>;
  subredditId: Scalars['String'];
  subredditList: Array<Subreddit>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  post?: Maybe<Post>;
  posts: Array<Post>;
  subreddit?: Maybe<Subreddit>;
  subreddits: Array<Subreddit>;
  votesForPost?: Maybe<Array<Vote>>;
};


export type QueryPostArgs = {
  input: GetPostInput;
};


export type QuerySubredditArgs = {
  input: GetSubredditByTopic;
};


export type QueryVotesForPostArgs = {
  input: GetVoteForPost;
};

export type Subreddit = {
  __typename?: 'Subreddit';
  _id: Scalars['String'];
  createdAt: Scalars['String'];
  posts: Array<Post>;
  topic: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  createdAt: Scalars['String'];
  email: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type Vote = {
  __typename?: 'Vote';
  _id: Scalars['String'];
  post: Post;
  postId: Scalars['String'];
  upvote: Scalars['Boolean'];
  user: User;
  userId: Scalars['String'];
};

export type VoteInput = {
  postId: Scalars['String'];
  upvote: Scalars['Boolean'];
};

export type CreateCommentMutationVariables = Exact<{
  postId: Scalars['String'];
  text: Scalars['String'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', _id: string, text: string, postId: string } };

export type CreatePostMutationVariables = Exact<{
  title: Scalars['String'];
  body: Scalars['String'];
  topic: Scalars['String'];
  image?: InputMaybe<Scalars['String']>;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', _id: string, title: string, image?: string | null, body: string, createdAt: any, user?: { __typename?: 'User', _id: string, username: string } | null, subredditList: Array<{ __typename?: 'Subreddit', topic: string, _id: string }> } };

export type CreateSubredditMutationVariables = Exact<{
  topic: Scalars['String'];
}>;


export type CreateSubredditMutation = { __typename?: 'Mutation', createSubreddit: { __typename?: 'Subreddit', _id: string, topic: string } };

export type DeleteVoteMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteVoteMutation = { __typename?: 'Mutation', deleteVote?: { __typename?: 'Vote', _id: string } | null };

export type LoginUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', login: { __typename?: 'User', _id: string, email: string, username: string } };

export type PostQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', _id: string, title: string, image?: string | null, body: string, createdAt: any, user?: { __typename?: 'User', _id: string, username: string } | null, subredditList: Array<{ __typename?: 'Subreddit', _id: string, topic: string }>, comments: Array<{ __typename?: 'Comment', _id: string, text: string, createdAt: any, user: { __typename?: 'User', _id: string, username: string } }> } | null };

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', _id: string, title: string, image?: string | null, body: string, createdAt: any, user?: { __typename?: 'User', _id: string, username: string } | null, subredditList: Array<{ __typename?: 'Subreddit', _id: string, topic: string }> }> };

export type CreateUserMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', register: { __typename?: 'User', email: string, username: string } };

export type SetUpVoteMutationVariables = Exact<{
  postId: Scalars['String'];
  upvote: Scalars['Boolean'];
}>;


export type SetUpVoteMutation = { __typename?: 'Mutation', setUpVote: { __typename?: 'Vote', _id: string, upvote: boolean, user: { __typename?: 'User', _id: string, username: string } } };

export type PostInfoFragment = { __typename?: 'Post', _id: string, title: string, body: string, image?: string | null, createdAt: any, user?: { __typename?: 'User', _id: string, username: string } | null };

export type SubredditQueryVariables = Exact<{
  topic: Scalars['String'];
}>;


export type SubredditQuery = { __typename?: 'Query', subreddit?: { __typename?: 'Subreddit', _id: string, topic: string, posts: Array<{ __typename?: 'Post', _id: string, title: string, body: string, image?: string | null, createdAt: any, user?: { __typename?: 'User', _id: string, username: string } | null }> } | null };

export type SubredditsQueryVariables = Exact<{ [key: string]: never; }>;


export type SubredditsQuery = { __typename?: 'Query', subreddits: Array<{ __typename?: 'Subreddit', topic: string, _id: string }> };

export type VotesForPostQueryVariables = Exact<{
  postId: Scalars['String'];
}>;


export type VotesForPostQuery = { __typename?: 'Query', votesForPost?: Array<{ __typename?: 'Vote', _id: string, upvote: boolean, user: { __typename?: 'User', _id: string } }> | null };

export type CommentKeySpecifier = ('_id' | 'createdAt' | 'post' | 'postId' | 'text' | 'updatedAt' | 'user' | CommentKeySpecifier)[];
export type CommentFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	post?: FieldPolicy<any> | FieldReadFunction<any>,
	postId?: FieldPolicy<any> | FieldReadFunction<any>,
	text?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('createComment' | 'createPost' | 'createSubreddit' | 'deleteVote' | 'login' | 'register' | 'setUpVote' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	createComment?: FieldPolicy<any> | FieldReadFunction<any>,
	createPost?: FieldPolicy<any> | FieldReadFunction<any>,
	createSubreddit?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteVote?: FieldPolicy<any> | FieldReadFunction<any>,
	login?: FieldPolicy<any> | FieldReadFunction<any>,
	register?: FieldPolicy<any> | FieldReadFunction<any>,
	setUpVote?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PostKeySpecifier = ('_id' | 'body' | 'comments' | 'createdAt' | 'image' | 'subredditId' | 'subredditList' | 'title' | 'updatedAt' | 'user' | PostKeySpecifier)[];
export type PostFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	body?: FieldPolicy<any> | FieldReadFunction<any>,
	comments?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	image?: FieldPolicy<any> | FieldReadFunction<any>,
	subredditId?: FieldPolicy<any> | FieldReadFunction<any>,
	subredditList?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('post' | 'posts' | 'subreddit' | 'subreddits' | 'votesForPost' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	post?: FieldPolicy<any> | FieldReadFunction<any>,
	posts?: FieldPolicy<any> | FieldReadFunction<any>,
	subreddit?: FieldPolicy<any> | FieldReadFunction<any>,
	subreddits?: FieldPolicy<any> | FieldReadFunction<any>,
	votesForPost?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SubredditKeySpecifier = ('_id' | 'createdAt' | 'posts' | 'topic' | 'updatedAt' | SubredditKeySpecifier)[];
export type SubredditFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	posts?: FieldPolicy<any> | FieldReadFunction<any>,
	topic?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('_id' | 'createdAt' | 'email' | 'updatedAt' | 'username' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	username?: FieldPolicy<any> | FieldReadFunction<any>
};
export type VoteKeySpecifier = ('_id' | 'post' | 'postId' | 'upvote' | 'user' | 'userId' | VoteKeySpecifier)[];
export type VoteFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	post?: FieldPolicy<any> | FieldReadFunction<any>,
	postId?: FieldPolicy<any> | FieldReadFunction<any>,
	upvote?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	Comment?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CommentKeySpecifier | (() => undefined | CommentKeySpecifier),
		fields?: CommentFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Post?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PostKeySpecifier | (() => undefined | PostKeySpecifier),
		fields?: PostFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Subreddit?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SubredditKeySpecifier | (() => undefined | SubredditKeySpecifier),
		fields?: SubredditFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	},
	Vote?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | VoteKeySpecifier | (() => undefined | VoteKeySpecifier),
		fields?: VoteFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;
export const PostInfoFragmentDoc = gql`
    fragment PostInfo on Post {
  _id
  title
  body
  image
  user {
    _id
    username
  }
  createdAt
}
    `;
export const CreateCommentDocument = gql`
    mutation createComment($postId: String!, $text: String!) {
  createComment(input: {postId: $postId, text: $text}) {
    _id
    text
    postId
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreatePostDocument = gql`
    mutation createPost($title: String!, $body: String!, $topic: String!, $image: String) {
  createPost(input: {title: $title, body: $body, topic: $topic, image: $image}) {
    _id
    title
    image
    body
    user {
      _id
      username
    }
    subredditList {
      topic
      _id
    }
    createdAt
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      title: // value for 'title'
 *      body: // value for 'body'
 *      topic: // value for 'topic'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const CreateSubredditDocument = gql`
    mutation createSubreddit($topic: String!) {
  createSubreddit(input: {topic: $topic}) {
    _id
    topic
  }
}
    `;
export type CreateSubredditMutationFn = Apollo.MutationFunction<CreateSubredditMutation, CreateSubredditMutationVariables>;

/**
 * __useCreateSubredditMutation__
 *
 * To run a mutation, you first call `useCreateSubredditMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubredditMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubredditMutation, { data, loading, error }] = useCreateSubredditMutation({
 *   variables: {
 *      topic: // value for 'topic'
 *   },
 * });
 */
export function useCreateSubredditMutation(baseOptions?: Apollo.MutationHookOptions<CreateSubredditMutation, CreateSubredditMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSubredditMutation, CreateSubredditMutationVariables>(CreateSubredditDocument, options);
      }
export type CreateSubredditMutationHookResult = ReturnType<typeof useCreateSubredditMutation>;
export type CreateSubredditMutationResult = Apollo.MutationResult<CreateSubredditMutation>;
export type CreateSubredditMutationOptions = Apollo.BaseMutationOptions<CreateSubredditMutation, CreateSubredditMutationVariables>;
export const DeleteVoteDocument = gql`
    mutation deleteVote($id: String!) {
  deleteVote(input: {_id: $id}) {
    _id
  }
}
    `;
export type DeleteVoteMutationFn = Apollo.MutationFunction<DeleteVoteMutation, DeleteVoteMutationVariables>;

/**
 * __useDeleteVoteMutation__
 *
 * To run a mutation, you first call `useDeleteVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteVoteMutation, { data, loading, error }] = useDeleteVoteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteVoteMutation(baseOptions?: Apollo.MutationHookOptions<DeleteVoteMutation, DeleteVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteVoteMutation, DeleteVoteMutationVariables>(DeleteVoteDocument, options);
      }
export type DeleteVoteMutationHookResult = ReturnType<typeof useDeleteVoteMutation>;
export type DeleteVoteMutationResult = Apollo.MutationResult<DeleteVoteMutation>;
export type DeleteVoteMutationOptions = Apollo.BaseMutationOptions<DeleteVoteMutation, DeleteVoteMutationVariables>;
export const LoginUserDocument = gql`
    mutation loginUser($email: String!, $password: String!) {
  login(data: {email: $email, password: $password}) {
    _id
    email
    username
  }
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const PostDocument = gql`
    query post($id: String!) {
  post(input: {_id: $id}) {
    _id
    title
    image
    body
    user {
      _id
      username
    }
    subredditList {
      _id
      topic
    }
    comments {
      _id
      text
      user {
        _id
        username
      }
      createdAt
    }
    createdAt
  }
}
    `;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostsDocument = gql`
    query posts {
  posts {
    _id
    title
    image
    body
    user {
      _id
      username
    }
    subredditList {
      _id
      topic
    }
    createdAt
  }
}
    `;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const CreateUserDocument = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
  register(data: {username: $username, email: $email, password: $password}) {
    email
    username
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const SetUpVoteDocument = gql`
    mutation setUpVote($postId: String!, $upvote: Boolean!) {
  setUpVote(input: {postId: $postId, upvote: $upvote}) {
    _id
    upvote
    user {
      _id
      username
    }
  }
}
    `;
export type SetUpVoteMutationFn = Apollo.MutationFunction<SetUpVoteMutation, SetUpVoteMutationVariables>;

/**
 * __useSetUpVoteMutation__
 *
 * To run a mutation, you first call `useSetUpVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUpVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUpVoteMutation, { data, loading, error }] = useSetUpVoteMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      upvote: // value for 'upvote'
 *   },
 * });
 */
export function useSetUpVoteMutation(baseOptions?: Apollo.MutationHookOptions<SetUpVoteMutation, SetUpVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetUpVoteMutation, SetUpVoteMutationVariables>(SetUpVoteDocument, options);
      }
export type SetUpVoteMutationHookResult = ReturnType<typeof useSetUpVoteMutation>;
export type SetUpVoteMutationResult = Apollo.MutationResult<SetUpVoteMutation>;
export type SetUpVoteMutationOptions = Apollo.BaseMutationOptions<SetUpVoteMutation, SetUpVoteMutationVariables>;
export const SubredditDocument = gql`
    query subreddit($topic: String!) {
  subreddit(input: {topic: $topic}) {
    _id
    topic
    posts {
      ...PostInfo
    }
  }
}
    ${PostInfoFragmentDoc}`;

/**
 * __useSubredditQuery__
 *
 * To run a query within a React component, call `useSubredditQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubredditQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubredditQuery({
 *   variables: {
 *      topic: // value for 'topic'
 *   },
 * });
 */
export function useSubredditQuery(baseOptions: Apollo.QueryHookOptions<SubredditQuery, SubredditQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SubredditQuery, SubredditQueryVariables>(SubredditDocument, options);
      }
export function useSubredditLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubredditQuery, SubredditQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SubredditQuery, SubredditQueryVariables>(SubredditDocument, options);
        }
export type SubredditQueryHookResult = ReturnType<typeof useSubredditQuery>;
export type SubredditLazyQueryHookResult = ReturnType<typeof useSubredditLazyQuery>;
export type SubredditQueryResult = Apollo.QueryResult<SubredditQuery, SubredditQueryVariables>;
export const SubredditsDocument = gql`
    query subreddits {
  subreddits {
    topic
    _id
  }
}
    `;

/**
 * __useSubredditsQuery__
 *
 * To run a query within a React component, call `useSubredditsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubredditsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubredditsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSubredditsQuery(baseOptions?: Apollo.QueryHookOptions<SubredditsQuery, SubredditsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SubredditsQuery, SubredditsQueryVariables>(SubredditsDocument, options);
      }
export function useSubredditsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubredditsQuery, SubredditsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SubredditsQuery, SubredditsQueryVariables>(SubredditsDocument, options);
        }
export type SubredditsQueryHookResult = ReturnType<typeof useSubredditsQuery>;
export type SubredditsLazyQueryHookResult = ReturnType<typeof useSubredditsLazyQuery>;
export type SubredditsQueryResult = Apollo.QueryResult<SubredditsQuery, SubredditsQueryVariables>;
export const VotesForPostDocument = gql`
    query votesForPost($postId: String!) {
  votesForPost(input: {postId: $postId}) {
    _id
    upvote
    user {
      _id
    }
  }
}
    `;

/**
 * __useVotesForPostQuery__
 *
 * To run a query within a React component, call `useVotesForPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useVotesForPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVotesForPostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useVotesForPostQuery(baseOptions: Apollo.QueryHookOptions<VotesForPostQuery, VotesForPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VotesForPostQuery, VotesForPostQueryVariables>(VotesForPostDocument, options);
      }
export function useVotesForPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VotesForPostQuery, VotesForPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VotesForPostQuery, VotesForPostQueryVariables>(VotesForPostDocument, options);
        }
export type VotesForPostQueryHookResult = ReturnType<typeof useVotesForPostQuery>;
export type VotesForPostLazyQueryHookResult = ReturnType<typeof useVotesForPostLazyQuery>;
export type VotesForPostQueryResult = Apollo.QueryResult<VotesForPostQuery, VotesForPostQueryVariables>;