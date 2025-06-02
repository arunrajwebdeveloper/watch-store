import { useParams } from "react-router-dom";
import { useProducts } from "../hook";
import { PageLayout } from "../../../layouts";

export const Edit = () => {
  const { id: productId } = useParams();

  const {
    fieldArray,
    updateProduct,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useProducts({
    load: false,
    productId,
  });

  const onSubmit = (data: any) => {
    const payload = {
      ...data,
      brand: data.brand.trim(),
      model: data.model.trim(),
      images: data.images.map((img: any) => img.url),
    };
    updateProduct.mutate(payload);
  };

  const { fields, append, remove } = fieldArray;

  return (
    <PageLayout title="Edit Product">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="brand" className="form-label">
              Brand<em>*</em>
            </label>
            <input
              type="text"
              className={`form-control ${errors.brand ? "is-invalid" : ""}`}
              id="brand"
              {...register("brand", {
                required: "Brand is required",
                maxLength: {
                  value: 50,
                  message: "First name limited to 50 characters",
                },
                pattern: {
                  value: /^[a-zA-Z&\-_ ]+$/,
                  message:
                    "Only alphabetic characters, &, -, _ and space are allowed",
                },
              })}
            />
            {errors.brand && (
              <span className="form-error-message">{errors.brand.message}</span>
            )}
          </div>
          <div className="col-md-6">
            <label htmlFor="model" className="form-label">
              Model<em>*</em>
            </label>
            <input
              type="text"
              className={`form-control ${errors.model ? "is-invalid" : ""}`}
              id="model"
              {...register("model", {
                required: "Model is required",
              })}
            />
            {errors.model && (
              <span className="form-error-message">{errors.model.message}</span>
            )}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description<em>*</em>
          </label>
          <textarea
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <span className="form-error-message">
              {errors.description.message}
            </span>
          )}
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="originalPrice" className="form-label">
              Original Price<em>*</em>
            </label>
            <input
              type="number"
              className={`form-control ${
                errors.originalPrice ? "is-invalid" : ""
              }`}
              id="originalPrice"
              {...register("originalPrice", {
                required: "Original Price is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Only numbers allowed",
                },
              })}
            />
            {errors.originalPrice && (
              <span className="form-error-message">
                {errors.originalPrice.message}
              </span>
            )}
          </div>
          <div className="col-md-6">
            <label htmlFor="currentPrice" className="form-label">
              Current Price<em>*</em>
            </label>
            <input
              type="number"
              className={`form-control ${
                errors.originalPrice ? "is-invalid" : ""
              }`}
              id="currentPrice"
              {...register("currentPrice", {
                required: "Current Price is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Only numbers allowed",
                },
              })}
            />
            {errors.currentPrice && (
              <span className="form-error-message">
                {errors.currentPrice.message}
              </span>
            )}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="weight" className="form-label">
            Weight<em>*</em>
          </label>
          <input
            type="number"
            className={`form-control ${errors.weight ? "is-invalid" : ""}`}
            id="weight"
            {...register("weight", {
              required: "Weight is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Only numbers allowed",
              },
            })}
          />
          {errors.weight && (
            <span className="form-error-message">{errors.weight.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="color" className="form-label">
            Color<em>*</em>
          </label>
          <input
            type="text"
            className={`form-control ${errors.color ? "is-invalid" : ""}`}
            id="color"
            {...register("color", {
              required: "Color is required",
            })}
          />
          {errors.color && (
            <span className="form-error-message">{errors.color.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="size" className="form-label">
            Size<em>*</em>
          </label>
          <input
            type="text"
            className={`form-control ${errors.size ? "is-invalid" : ""}`}
            id="size"
            {...register("size", {
              required: "Size is required",
            })}
          />
          {errors.size && (
            <span className="form-error-message">{errors.size.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="movementType" className="form-label">
            Movement Type<em>*</em>
          </label>
          <input
            type="text"
            className={`form-control ${
              errors.movementType ? "is-invalid" : ""
            }`}
            id="movementType"
            {...register("movementType", {
              required: "Movement Type is required",
            })}
          />
          {errors.movementType && (
            <span className="form-error-message">
              {errors.movementType.message}
            </span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Gender<em>*</em>
          </label>
          <input
            type="text"
            className={`form-control ${errors.gender ? "is-invalid" : ""}`}
            id="gender"
            {...register("gender", {
              required: "Gender Type is required",
            })}
          />
          {errors.gender && (
            <span className="form-error-message">{errors.gender.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="inventory" className="form-label">
            Inventory<em>*</em>
          </label>
          <input
            type="number"
            className={`form-control ${errors.inventory ? "is-invalid" : ""}`}
            id="inventory"
            {...register("inventory", {
              required: "Inventory is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Only numbers allowed",
              },
            })}
          />
          {errors.inventory && (
            <span className="form-error-message">
              {errors.inventory.message}
            </span>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">
            Images<em>*</em>
          </label>

          <div className="d-flex flex-wrap image-items-wrapper">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="d-flex flex-column image-item-holder"
              >
                <div className="image-input-preview">
                  {watch(`images.${index}.url`) ? (
                    <img
                      src={watch(`images.${index}.url`)}
                      alt="Preview"
                      className="image-preview-thumb"
                    />
                  ) : (
                    <svg
                      width="80px"
                      height="80px"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="images-empty-svg"
                    >
                      <path
                        d="M13.4126 15L10.5421 10.9335C10.0849 10.2858 9.85636 9.96204 9.57524 9.85289C9.32941 9.75744 9.05583 9.76296 8.81405 9.86825C8.53756 9.98865 8.32224 10.3214 7.89161 10.9869L4.25737 16.6035C4.16197 16.7509 4.11427 16.8247 4.08048 16.9041C4.0505 16.9746 4.02872 17.0483 4.01557 17.1238C4.00075 17.2088 4.00073 17.2967 4.00068 17.4723L4 20H20.0008L20.0008 17.4604C20.0008 17.2891 20.0008 17.2035 19.9867 17.1204C19.9742 17.0467 19.9534 16.9746 19.9249 16.9055C19.8926 16.8276 19.8471 16.7551 19.7561 16.61L18.79 15.0702C17.9362 13.7095 17.5093 13.0291 16.9545 12.7811C16.4695 12.5642 15.9181 12.5492 15.4221 12.7395C14.8547 12.957 14.3915 13.6132 13.4651 14.9256L13.4126 15ZM13.4126 15L16.9545 20M20.0008 6C20.0008 7.10457 19.1054 8 18.0008 8C16.8962 8 16.0008 7.10457 16.0008 6C16.0008 4.89543 16.8962 4 18.0008 4C19.1054 4 20.0008 4.89543 20.0008 6Z"
                        stroke="#9599b5"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <div className="image-input-field-holder d-flex">
                  <div className="image-input-field">
                    <input
                      type="text"
                      placeholder="Image URL"
                      className={`form-control ${
                        errors.images?.[index]?.url ? "is-invalid" : ""
                      }`}
                      {...register(`images.${index}.url`, {
                        required: "Image URL is required",
                        pattern: {
                          value: /^(http|https):\/\/[^ "]+$/, // simple URL pattern
                          message: "Invalid image URL",
                        },
                      })}
                    />
                    {errors.images?.[index]?.url && (
                      <span className="form-error-message">
                        {errors.images[index]?.url?.message}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="image-remove"
                  >
                    <svg
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M20.5001 6H3.5"
                        stroke="#ff0000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M9.5 11L10 16"
                        stroke="#ff0000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M14.5 11L14 16"
                        stroke="#ff0000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6"
                        stroke="#ff0000"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5M18.8334 8.5L18.6334 11.5"
                        stroke="#ff0000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            <div
              className="d-flex image-add-more"
              onClick={() => append({ url: "" })}
            >
              <svg width="80px" height="80px" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 12H15"
                  stroke="#9599b5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 9L12 15"
                  stroke="#9599b5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z"
                  stroke="#9599b5"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary p-2 w-100 mt-4 fw-bold"
          disabled={updateProduct?.isPending}
        >
          Update Product
        </button>
      </form>
    </PageLayout>
  );
};
