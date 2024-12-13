import React, { ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";
import { HiOutlineXMark } from "react-icons/hi2";
import { addUser, loginUser, addCommentTemplate } from "../api/ApiUsers";

interface AddDataProps {
  slug: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reloadUsersList: () => void;
}

const AddData: React.FC<AddDataProps> = ({
  slug,
  isOpen,
  //   columns,
  setIsOpen,
  reloadUsersList
}) => {
  // global
  const [showModal, setShowModal] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);

  // loading
  const [loading, setLoading] = React.useState(false);

  // add user
  const [accessToken, setaccessToken] = React.useState("");
  const [cookies, setcookies] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setpassword] = React.useState("");
  // const [isVerified, setIsVerified] = React.useState('');
  const [formUserIsEmpty, setFormUserIsEmpty] = React.useState(true);

  // add product
  const [title, setTitle] = React.useState("");
  const [color, setColor] = React.useState("");
  const [producer, setProducer] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [inStock, setInStock] = React.useState("");
  const [formProductIsEmpty, setFormProductIsEmpty] = React.useState(true);
  
  // add template
  const [content, setContent] = React.useState("");
  const [attachmentUrl, setAttachmentUrl] = React.useState("");
  const [formTemplateIsEmpty, setFormTemplateIsEmpty] = React.useState(true);

  // global
  const loadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageUpload = e.target.files[0];
      setFile(imageUpload);
      setPreview(URL.createObjectURL(imageUpload));
    }
  };

  const successAddUserAction = () => {
    setShowModal(false);
    setIsOpen(false);
    reloadUsersList();
  };

  const successAddTemplateAction = () => {
    setShowModal(false);
    setIsOpen(false);
    reloadUsersList();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // toast('Gabisa dong!', { icon: '😛' });
    try {
      if (accessToken) {
        // Use the addUser function for the token
        try {
          const response = await addUser({ token: accessToken });
          if (response.success) {
            toast.success(
              `User '${response.data.username}' added successfully!`
            );
            successAddUserAction();
          } else {
            toast.error("Failed to add user by Token!");
          }
        } catch (error) {
          toast.error("Error adding user by Access Token");
        }
      } else if (cookies) {
        // Use the addUser function for cookies
        try {
          const response = await addUser({ cookies });
          if (response.success) {
            toast.success(
              `User '${response.data.username}' added successfully!`
            );
            successAddUserAction();
          } else {
            toast.error("Failed to add user by Token!");
          }
        } catch (error) {
          toast.error("Error adding user by cookies");
        }
      } else if (email && password) {
        // Use the loginUser function for email/password login
        try {
          const response = await loginUser({ email, password });
          console.log(response);
          if (response.success) {
            toast.success(
              `User '${response.data.username}' added successfully!`
            );
            successAddUserAction();
          } else {
            toast.error("Failed to add user by Email and Password!");
          }
        } catch (error) {
          toast.error("Error logging in");
        }
      }
    } catch (error) {
      toast.error("Error occurred while adding user");
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }
  };

  const handleSubmitComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (content) {
        try {
          const response = await addCommentTemplate({
            content,
            attachment_url: attachmentUrl,
          });
          if (response.success) {
            toast.success('Comment template added successfully!');
            successAddTemplateAction();
          } else {
            toast.error("Failed to add new template comment");
          }
        } catch (error) {
          toast.error("Error adding new template");
        }
      }
    } catch (err) {
      toast.error("Error when adding new template");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  // add user
  React.useEffect(() => {
    if (
      accessToken === "" ||
      cookies === "" ||
      email === "" ||
      password === ""
    ) {
      setFormUserIsEmpty(true);
    }

    if (
      accessToken !== "" ||
      cookies !== "" ||
      (email !== "" && password !== "")
    ) {
      setFormUserIsEmpty(false);
    }
  }, [email, accessToken, cookies, password]);

  React.useEffect(() => {
    if (
      content === "" 
    ) {
      setFormTemplateIsEmpty(true);
    }

    if (
      content !== ""
    ) {
      setFormTemplateIsEmpty(false);
    }
  }, [content, attachmentUrl]);

  React.useEffect(() => {
    if (
      title === "" ||
      color === "" ||
      producer === "" ||
      price === "" ||
      inStock === "" ||
      file === null
    ) {
      setFormProductIsEmpty(true);
    }

    if (
      title !== "" &&
      color !== "" &&
      producer !== "" &&
      price !== "" &&
      inStock !== "" &&
      file !== null
    ) {
      setFormProductIsEmpty(false);
    }
  }, [color, file, inStock, price, producer, title]);

  if (slug === "user") {
    return (
      <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-black/75 z-[99]">
        <div
          className={`w-[80%] xl:w-[50%] rounded-lg p-7 bg-base-100 relative transition duration-300 flex flex-col items-stretch gap-5 ${
            showModal ? "translate-y-0" : "translate-y-full"
          }
            ${showModal ? "opacity-100" : "opacity-0"}`}
        >
          <div className="w-full flex justify-between pb-5 border-b border-base-content border-opacity-30">
            <button
              onClick={() => {
                setShowModal(false);
                setIsOpen(false);
              }}
              className="absolute top-5 right-3 btn btn-ghost btn-circle"
            >
              <HiOutlineXMark className="text-xl font-bold" />
            </button>
            <span className="text-2xl font-bold">Add new {slug}</span>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4"
          >
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Add by Access Token</span>
              </div>
              <input
                type="text"
                placeholder="EAAA..."
                className="input input-bordered w-full"
                name="accessToken"
                id="accessToken"
                onChange={(element) => setaccessToken(element.target.value)}
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">or by Cookies</span>
              </div>
              <input
                type="text"
                placeholder="ps=xx; datr=xx; fr=xx;"
                className="input input-bordered w-full"
                name="cookies"
                id="cookies"
                onChange={(element) => setcookies(element.target.value)}
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">or by Classic Login Method</span>
              </div>
              <input
                type="text"
                placeholder="Email"
                className="input input-bordered w-full"
                name="email"
                id="email"
                onChange={(element) => setEmail(element.target.value)}
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text"> and Password</span>
              </div>
              <input
                type="text"
                placeholder="Password"
                className="input input-bordered w-full"
                name="password"
                id="password"
                onChange={(element) => setpassword(element.target.value)}
              />
            </label>
            {/* <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Verified Status</span>
              </div>
              <select
                className="select select-bordered"
                name="isVerified"
                id="isVerified"
                onChange={(element) =>
                  setIsVerified(element.target.value)
                }
              >
                <option disabled selected>
                  Select one
                </option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">
                  Pick a profile photo
                </span>
              </div>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                onChange={loadImage}
              />
            </label> */}
            {preview && preview !== "" && (
              <div className="w-full flex flex-col items-start gap-3">
                <span>Profile Preview</span>
                <div className="avatar">
                  <div className="w-24 rounded-full">
                    <img src={preview} alt="profile-upload" />
                  </div>
                </div>
              </div>
            )}
            <button
              type="submit"
              className={`mt-5 btn ${
                formUserIsEmpty || loading ? "btn-disabled" : "btn-primary"
              } btn-block col-span-full font-semibold`}
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <span className="loading loading-spinner loading-md"></span> // Add spinner icon when loading
              ) : (
                "Login" // Default button text
              )}
            </button>

            {/* <button
              className={`mt-5 btn ${
                formUserIsEmpty ? "btn-disabled" : "btn-primary"
              } btn-block col-span-full font-semibold`}
            >
              Login
            </button> */}
          </form>
        </div>
      </div>
    );
  }

  if (slug === "product") {
    return (
      <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-black/75 z-[99]">
        <div
          className={`w-[80%] xl:w-[50%] rounded-lg p-7 bg-base-100 relative transition duration-300 flex flex-col items-stretch gap-5 ${
            showModal ? "translate-y-0" : "translate-y-full"
          }
            ${showModal ? "opacity-100" : "opacity-0"}`}
        >
          <div className="w-full flex justify-between pb-5 border-b border-base-content border-opacity-30">
            <button
              onClick={() => {
                setShowModal(false);
                setIsOpen(false);
              }}
              className="absolute top-5 right-3 btn btn-ghost btn-circle"
            >
              <HiOutlineXMark className="text-xl font-bold" />
            </button>
            <span className="text-2xl font-bold">Add new {slug}</span>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4"
          >
            <input
              type="text"
              placeholder="Product Title"
              className="input input-bordered w-full"
              name="title"
              id="title"
              onChange={(element) => setTitle(element.target.value)}
            />
            <input
              type="text"
              placeholder="Colour: Black, White, Red, etc"
              className="input input-bordered w-full"
              name="color"
              id="color"
              onChange={(element) => setColor(element.target.value)}
            />
            <input
              type="text"
              placeholder="Producer: Samsung, Apple, etc"
              className="input input-bordered w-full"
              name="producer"
              id="producer"
              onChange={(element) => setProducer(element.target.value)}
            />
            <input
              type="text"
              placeholder="Price"
              className="input input-bordered w-full"
              name="price"
              id="price"
              onChange={(element) => setPrice(element.target.value)}
            />
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">In Stock Status</span>
              </div>
              <select
                className="select select-bordered"
                name="inStock"
                id="inStock"
                onChange={(element) => setInStock(element.target.value)}
              >
                <option disabled selected>
                  Select one
                </option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Pick a product image</span>
              </div>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                onChange={loadImage}
              />
            </label>
            {preview && preview !== "" && (
              <div className="w-full flex flex-col items-start gap-3">
                <span>Product Preview</span>
                <div className="avatar">
                  <div className="w-24 rounded-full">
                    <img src={preview} alt="profile-upload" />
                  </div>
                </div>
              </div>
            )}
            <button
              className={`mt-5 btn ${
                formProductIsEmpty ? "btn-disabled" : "btn-primary"
              } btn-block col-span-full font-semibold`}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (slug === "template") {
    return (
      <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-black/75 z-[99]">
        <div
          className={`w-[80%] xl:w-[50%] rounded-lg p-7 bg-base-100 relative transition duration-300 flex flex-col items-stretch gap-5 ${
            showModal ? "translate-y-0" : "translate-y-full"
          }
            ${showModal ? "opacity-100" : "opacity-0"}`}
        >
          <div className="w-full flex justify-between pb-5 border-b border-base-content border-opacity-30">
            <button
              onClick={() => {
                setShowModal(false);
                setIsOpen(false);
              }}
              className="absolute top-5 right-3 btn btn-ghost btn-circle"
            >
              <HiOutlineXMark className="text-xl font-bold" />
            </button>
            <span className="text-2xl font-bold">Add new {slug}</span>
          </div>
          <form
            onSubmit={handleSubmitComment}
            className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4"
          >
            <input
              type="text"
              placeholder="Comment Content"
              className="input input-bordered w-full"
              name="content"
              id="content"
              onChange={(element) => setContent(element.target.value)}
            />
            <input
              type="text"
              placeholder="Attachment URL"
              className="input input-bordered w-full"
              name="attachment_url"
              id="attachment_url"
              onChange={(element) => setAttachmentUrl(element.target.value)}
            />
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Or pick from file</span>
              </div>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                onChange={loadImage}
              />
            </label>
            {preview && preview !== "" && (
              <div className="w-full flex flex-col items-start gap-3">
                <span>Attachment Preview</span>
                <div className="avatar">
                  <div className="w-24 rounded-full">
                    <img src={preview} alt="profile-upload" />
                  </div>
                </div>
              </div>
            )}
            <button
              type="submit"
              className={`mt-5 btn ${
                formTemplateIsEmpty || loading ? "btn-disabled" : "btn-primary"
              } btn-block col-span-full font-semibold`}
              disabled={loading} 
            >
              {loading ? (
                <span className="loading loading-spinner loading-md"></span> // Add spinner icon when loading
              ) : (
                "Submit" 
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return null;
};

export default AddData;
