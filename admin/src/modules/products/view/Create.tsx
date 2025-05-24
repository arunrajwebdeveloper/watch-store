import { PageLayout } from "../../../layouts";
import { useProducts } from "../hook";

export const Create = () => {
  const {
    fieldArray,
    createProduct,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useProducts({
    load: false,
  });

  const onSubmit = (data: any) => {
    const payload = {
      ...data,
      brand: data.brand.trim(),
      model: data.model.trim(),
      images: data.images.map((img: any) => img.url),
    };
    createProduct.mutate(payload);
  };

  const { fields, append, remove } = fieldArray;

  return (
    <PageLayout title="Create Product">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
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
        <div className="mb-3">
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
        <div className="mb-3">
          <label htmlFor="variantGroupId" className="form-label">
            Variant Group Id
          </label>
          <input
            type="text"
            className={`form-control ${
              errors.variantGroupId ? "is-invalid" : ""
            }`}
            id="variantGroupId"
            {...register("variantGroupId")}
          />
          {errors.variantGroupId && (
            <span className="form-error-message">
              {errors.variantGroupId.message}
            </span>
          )}
        </div>
        <div className="mb-3">
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
        <div className="mb-3">
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

          <div>
            {fields.map((field, index) => (
              <div key={field.id} className="d-flex  mb-4">
                <div className="">
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

                <div className="">
                  {watch(`images.${index}.url`) && (
                    <img
                      src={watch(`images.${index}.url`)}
                      alt="Preview"
                      className=""
                      style={{ width: "100px", objectFit: "cover" }}
                    />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className=""
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => append({ url: "" })}
              className=""
            >
              Add More
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary p-3 w-100 mt-2 fw-bold"
          disabled={createProduct?.isPending}
        >
          Create Product
        </button>
      </form>
    </PageLayout>
  );
};
