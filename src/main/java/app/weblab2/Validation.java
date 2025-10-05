package app.weblab2;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class Validation {

    public boolean validateParameters(double x, double y, int r) {
        if (x < -5 || x > 5) {
            return false;
        }

        if (y < -5 || y > 5) {
            return false;
        }

        int[] validRValues = {1, 2, 3, 4, 5};
        return Arrays.stream(validRValues).anyMatch(val -> val == r);
    }

    public boolean checkHit(double x, double y, int r) {

        if (x <= 0 && y <= 0 && y >= -x - r) { // triangle
            return true;
        }

        if (x >= 0 && y>= 0 && x <= r && y <= r/2.0) {  //rectangle
            return true;
        }

        //circle
        return x <= 0 && y >= 0 && x * x + y * y <=  r * r;
    }
}
