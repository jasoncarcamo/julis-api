const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'test-user-1',
      full_name: 'Test user 1',
      nickname: 'TU1',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 2,
      user_name: 'test-user-2',
      full_name: 'Test user 2',
      nickname: 'TU2',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 3,
      user_name: 'test-user-3',
      full_name: 'Test user 3',
      nickname: 'TU3',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 4,
      user_name: 'test-user-4',
      full_name: 'Test user 4',
      nickname: 'TU4',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
  ]
}

function makeArticlesArray(users) {
  return [
    {
      id: 1,
      title: 'First test post!',
      style: 'How-to',
      author_id: users[0].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 2,
      title: 'Second test post!',
      style: 'Interview',
      author_id: users[1].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 3,
      title: 'Third test post!',
      style: 'News',
      author_id: users[2].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 4,
      title: 'Fourth test post!',
      style: 'Listicle',
      author_id: users[3].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
  ]
}

function makeCommentsArray(users, articles) {
  return [
    {
      id: 1,
      text: 'First test comment!',
      article_id: articles[0].id,
      user_id: users[0].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 2,
      text: 'Second test comment!',
      article_id: articles[0].id,
      user_id: users[1].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 3,
      text: 'Third test comment!',
      article_id: articles[0].id,
      user_id: users[2].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 4,
      text: 'Fourth test comment!',
      article_id: articles[0].id,
      user_id: users[3].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 5,
      text: 'Fifth test comment!',
      article_id: articles[articles.length - 1].id,
      user_id: users[0].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 6,
      text: 'Sixth test comment!',
      article_id: articles[articles.length - 1].id,
      user_id: users[2].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 7,
      text: 'Seventh test comment!',
      article_id: articles[3].id,
      user_id: users[0].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
  ];
}

function makeExpectedArticle(users, article, comments=[]) {
  const author = users
    .find(user => user.id === article.author_id)

  const number_of_comments = comments
    .filter(comment => comment.article_id === article.id)
    .length

  return {
    id: article.id,
    style: article.style,
    title: article.title,
    content: article.content,
    date_created: article.date_created.toISOString(),
    number_of_comments,
    author: {
      id: author.id,
      user_name: author.user_name,
      full_name: author.full_name,
      nickname: author.nickname,
      date_created: author.date_created.toISOString(),
      date_modified: author.date_modified || null,
    },
  }
}

function makeExpectedArticleComments(users, articleId, comments) {
  const expectedComments = comments
    .filter(comment => comment.article_id === articleId)

  return expectedComments.map(comment => {
    const commentUser = users.find(user => user.id === comment.user_id)
    return {
      id: comment.id,
      text: comment.text,
      date_created: comment.date_created.toISOString(),
      user: {
        id: commentUser.id,
        user_name: commentUser.user_name,
        full_name: commentUser.full_name,
        nickname: commentUser.nickname,
        date_created: commentUser.date_created.toISOString(),
        date_modified: commentUser.date_modified || null,
      }
    }
  })
}

function makeMaliciousArticle(user) {
  const maliciousArticle = {
    id: 911,
    style: 'How-to',
    date_created: new Date(),
    title: 'Naughty naughty very naughty <script>alert("xss");</script>',
    author_id: user.id,
    content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
  }
  const expectedArticle = {
    ...makeExpectedArticle([user], maliciousArticle),
    title: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
    content: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
  }
  return {
    maliciousArticle,
    expectedArticle,
  }
}

function makeArticlesFixtures() {
  const testUsers = makeUsersArray()
  const testArticles = makeArticlesArray(testUsers)
  const testComments = makeCommentsArray(testUsers, testArticles)
  return { testUsers, testArticles, testComments }
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        services,
        users
      `
    )
   
  )
}

function seedUsers(db, user) {
 
  return db.insert(user).into('users').returning('*').then(([user])=> user);
}

function seedArticlesTables(db, users, service, ) {
  // use a transaction to group the queries and auto rollback on any failure
  return db.transaction(async trx => {
    await seedUsers(trx, users)
    await trx.into('services').insert(service)
    // update the auto sequence to match the forced id values
    await trx.raw(
      `SELECT setval('services_id_seq', ?)`,
      [service[service.length - 1].id],
    )
    // only insert comments if there are some, also update the sequence counter

  })
}

function seedMaliciousArticle(db, user, article) {
  return seedUsers(db, [user])
    .then(() =>
      db
        .into('blogful_articles')
        .insert([article])
    )
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user: user.id }, secret, {
    subject: user.mobile_number,
    algorithm: 'HS256',
  })
  return `bearer ${token}`
}

module.exports = {
  makeUsersArray,
  makeArticlesArray,
  makeExpectedArticle,
  makeExpectedArticleComments,
  makeMaliciousArticle,
  makeCommentsArray,

  makeArticlesFixtures,
  cleanTables,
  seedArticlesTables,
  seedMaliciousArticle,
  makeAuthHeader,
  seedUsers,
}
