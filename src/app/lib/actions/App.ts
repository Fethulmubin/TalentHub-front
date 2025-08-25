
export async function ApplyForJob(prevState: any, formData: FormData) {

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applications`, {
      method: "POST",
      body: formData,  // send the actual FormData (resume + jobId )
      credentials: "include",
    });

    if (!res.ok) {
     const errorData = await res.json();
     return { status: false, message: errorData.message || "Failed to Submit Application" };
    }

    const result = await res.json();
    return { status: true, message: "Application Submitted Successfully", app: result.app };
  } catch (error) {
    console.error("Post job error:", error);
    return { status: false, message: "Something went wrong" };
  }
}


// getting appliction by user id
export async function getAppById(userId: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applications/${userId}`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { status: false, message: errorData.message || "Failed to Fetch Application" };
    }

    const result = await res.json();
    return { status: true, app: result.applications };
  } catch (error) {
    console.error("Get application error:", error);
    return { status: false, message: "Something went wrong" };
  }
}