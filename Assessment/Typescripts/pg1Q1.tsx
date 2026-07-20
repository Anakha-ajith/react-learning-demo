
interface User {
  id: number;
  name: string;
  email: string;
}

interface ErrorResponse {
  code: number;
  message: string;
}

type ApiResponse = User | ErrorResponse;

function isUser(response: ApiResponse): response is User {
  return "id" in response && "email" in response;
}

interface Props {
  response: ApiResponse;
}

const ApiResponseComponent: React.FC<Props> = ({ response }) => {
  if (isUser(response)) {
    return (
      <div>
        <h2>User Details</h2>
        <p><strong>ID:</strong> {response.id}</p>
        <p><strong>Name:</strong> {response.name}</p>
        <p><strong>Email:</strong> {response.email}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Error</h2>
      <p><strong>Code:</strong> {response.code}</p>
      <p><strong>Message:</strong> {response.message}</p>
    </div>
  );
};

export default ApiResponseComponent;