import { Main } from "./index";
import { Server } from "./server";

jest.mock("./server");

describe("Main Tests", () => {
  let main: Main;
  let serverMock: jest.Mocked<Server>;

  beforeEach(() => {
    serverMock = new Server(3000) as jest.Mocked<Server>;
    main = new Main();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should start the server on boot", () => {
    serverMock.start.mockImplementationOnce((callback: () => void) => {
      callback();
    });
    jest.spyOn(main, "boot").mockImplementation(() => {});
    main.boot();
    expect(main.boot).toHaveBeenCalledTimes(1);
  });

  it("should stop the server on shutdown", () => {
    serverMock.stop.mockImplementationOnce((callback: () => void) => {
      callback();
    });
    jest.spyOn(main, "shutdown").mockImplementation(() => {});
    main.shutdown();
    expect(main.shutdown).toHaveBeenCalledTimes(1);
  });
});
