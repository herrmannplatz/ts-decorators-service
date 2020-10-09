import Axios from "axios"

interface Posts {
  id: string;
  userId: string,
  title: string;
  body: string;
}

interface Comment {
  id: string;
  postId: string,
  name: string;
  email: string;
  body: string;
}

function Service(baseUrl: string) {
  return function <T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      baseUrl = baseUrl
    }
  }
}

function Get(path: string) {
  return function (target: any, name: string) {
    const fetch = (baseUrl: string) => Axios.get(`${baseUrl}${path}`)

    Object.defineProperty(target, name, {
      get() {
        return fetch(this.baseUrl)
      }
    })
  }
}

@Service('https://jsonplaceholder.typicode.com')
class PlaceholderService {
  @Get('/posts')
  posts!: Promise<Posts[]>;

  @Get('/comments')
  comments!: Promise<Comment[]>;
}

const svc = new PlaceholderService();

(async () => {
  const posts = await svc.posts
  console.log(posts)

  const comments = await svc.comments
  console.log(comments)
})()